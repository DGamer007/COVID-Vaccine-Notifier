
This is a file contains all the details related to Environmental Variables...
-------------------
On Local Server:
-------------------

The path of file which contains all the Environmental Variables;
/config/dev.env (from root of the Project)
and If User wants to use another path then he/she will have to change path in package.json(line 8) for dev Script.

---------------------
On Production Server:
---------------------

On Production Server we dont need to provide path for Environmental Variables (almost) so no need to worry about that in here...

Now, Let's check the list of variables...

==========
Variables:
==========

PORT -> Port Number on local machine (No need to specify on Production Server)
MONGODB_PRODUCTION_URL -> URL for MongoDB Database
SENDGRID_API_KEY -> SendGrid API key (SendGrid: It provides NodeJS API to send email from application)
ADMIN_EMAIL -> Email_Id that you want to set as your application admin
SENDGRID_SENDER_EMAIL -> Email_Id that you want to send email from (Email_Id must be authorized from SendGrid)


