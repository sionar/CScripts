from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django.dispatch import receiver
from django.urls import reverse
from django.core.validators import RegexValidator
from django.core.mail import EmailMessage
from rest_framework.authtoken.models import Token
from django_rest_passwordreset.signals import reset_password_token_created
import os
from urllib.parse import urlparse
from urllib.parse import unquote
import smtplib
import email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class AccountManager(BaseUserManager):
	def create_user(self, email, username, password=None):
		if not email:
			raise ValueError('Users must have an email address')
		if not username:
			raise ValueError('Users must have a username')
		user = self.model(
			email=self.normalize_email(email),
			username=username,
		)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, username, password):
		user = self.create_user(
			email=self.normalize_email(email),
			password=password,
			username=username,
		)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user

class Account(AbstractBaseUser, PermissionsMixin):
	alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')

	email 					= models.EmailField(verbose_name='email', max_length=60, unique=True)
	username 				= models.CharField(max_length=36, unique=True, validators=[alphanumeric])
	date_joined			= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
	last_login			= models.DateTimeField(verbose_name='last login', auto_now=True)
	is_admin				= models.BooleanField(default=False)
	is_active				= models.BooleanField(default=True)
	is_staff				= models.BooleanField(default=False)
	is_superuser		= models.BooleanField(default=False)
	is_guest				= models.BooleanField(default=False)

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['email']
	objects = AccountManager()

	def __str__(self):
		return self.username

	# For checking permissions. to keep it simple all admin have ALL permissons
	def has_perm(self, perm, obj=None):
		return self.is_admin

	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
	def has_module_perms(self, app_label):
		return True

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
	email_plaintext_message = '<div>Hello, you received this email because you requested a password reset from Clocktower Scripts.</div><div>To reset your password, enter in the provided token on the website along with your new password.</div><div>The token is:</div><div><b>{}</b></div><br><br><div>If you did not request to reset your password, you can ignore this email.</div>'.format(reset_password_token.key)
	# msg = EmailMessage(
	# 		# title:
	# 		'Password Reset for Clocktower Scripts',
	# 		# message:
	# 		email_plaintext_message,
	# 		# from:
	# 		'noreply@clocktowerscripts.com',
	# 		# to:
	# 		[reset_password_token.user.email]
	# )
	# msg.content_subtype = 'html'
	# msg.send()
	# read and parse MailerToGo env vars
	mailertogo = urlparse(os.environ.get('MAILERTOGO_URL'))
	mailertogo_domain = os.environ.get('MAILERTOGO_DOMAIN', "clocktowerscripts.com")
	mailertogo_username = unquote(os.environ.get('EMAIL_HOST_USER'))
	mailertogo_password = unquote(os.environ.get('EMAIL_HOST_PASSWORD'))

	# sender
	sender_user = 'noreply'
	sender_email = "@".join([sender_user, mailertogo_domain])
	sender_name = 'Clocktower Scripts'

	# recipient
	recipient_email = [reset_password_token.user.email] # change to recipient email. Make sure to use a real email address in your tests to avoid hard bounces and protect your reputation as a sender.
	recipient_name = ''

	# subject
	subject = 'Password Reset for Clocktower Scripts'

	# text body
	body_plain = ('<div>Hello, you received this email because you requested a password reset from Clocktower Scripts.</div><div>To reset your password, enter in the provided token on the website along with your new password.</div><div>The token is:</div><div><b>{}</b></div><br><br><div>If you did not request to reset your password, you can ignore this email.</div>'.format(reset_password_token.key)	)

	# html body
	line_break = '\n' #used to replace line breaks with html breaks
	body_html = f'''<html>
			<head></head>
			<body>
			{body_plain}
			</body>
			</html>'''

	# create message container
	message = MIMEMultipart('alternative')
	message['Subject'] = subject
	message['From'] = email.utils.formataddr((sender_name, sender_email))
	message['To'] = email.utils.formataddr((recipient_name, recipient_email))

	# prepare plain and html message parts
	part1 = MIMEText(body_plain, 'plain')
	part2 = MIMEText(body_html, 'html')

	# attach parts to message

	message.attach(part1)
	message.attach(part2)

	# send the message.
	try:
			server = smtplib.SMTP('email-smtp.us-east-1.amazonaws.com', os.environ.get('EMAIL_PORT'))
			server.ehlo()
			server.starttls()
			server.ehlo()
			server.login(mailertogo_username, mailertogo_password)
			server.sendmail(sender_email, recipient_email, message.as_string())
			server.close()
	except Exception as e:
			print ("Error: ", e)
