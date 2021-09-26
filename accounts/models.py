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
	msg = EmailMessage(
			# title:
			'Password Reset for Clocktower Scripts',
			# message:
			email_plaintext_message,
			# from:
			'noreply@clocktowerscripts.com',
			# to:
			[reset_password_token.user.email]
	)
	msg.content_subtype = 'html'
	msg.send()