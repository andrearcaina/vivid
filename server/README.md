# Tech Stack
[![PYTHON](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![DJANGO](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/) 
[![POSTGRESQL](https://img.shields.io/badge/POSTGRESQL-14354C?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![SUPABASE](https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge)](https://supabase.com/)

# File Tree Structure

Our backend consists of 5 different "django applications".
1. `classes_offered`
2. `finance_tracking`
3. `member_logs`
4. `message_platform`
5. `user_auth`

Each of these apps handle specific parts of our application.

For simplicity sake, these 5 apps will be noted as "membership_app" in the file structure below.
Every single django application we've created has most of these files. 

```plaintext
server/
├── membership_tracker/
│    └── __init__.py               # created after initializing django project
|    └── asgi.py                   # asynchronous server gateway interface (web server)
|    └── settings.py               # the overall settings of our django project (includes middleware and database)
|    └── urls.py                   # overall routes of our django project
|    └── wsgi.py                   # web server gateway interface (web server)
├── membership_app/                # django app handling classes offered section
|    └── migrations/               # migration changes depending on the django application
|          └── 0001_initial.py     # these depend on the number of migration changes in django
│    └── __init__.py               # created after initializing django app
|    └── admin.py                  # created after initializing django app
|    └── apps.py                   # created after initializing django app
|    └── consumers.py              # used only in 3. message_platform app, for websocket connections and handling
|    └── models.py                 # utilized to define objects for certain app requirements (logs, finances)
|    └── routing.py                # used only in 3. message_platform app, for websocket connection routing
|    └── seralizers.py             # used to convert database objects into readable python data types 
|    └── tests.py                  # used for testing certain API routes or websocket handles
|    └── urls.py                   # used to define certain API routes for certain django applications
|    └── views.py                  # used to define the functionality of the API routes (HTTP request handling)
└── .env                           # environment variables and config settings for database
└── .env.example                   # environment variable example file
└── .gitignore                     # ignore python files
└── README.md                      # this README file
└── manage.py                      # the main application entry point
└── requirements.txt               # the dependencies associated with our application
```

# Data Models

## User
| Field         | Type        | Description                              |
|---------------|-------------|------------------------------------------|
| ID            | int8        | The primary key (auto-incremented).      |
| first_name    | varchar     | First name of user.                      |
| last_name     | varchar     | Last name of user.                       |
| is_active     | bool        | User activity (on the application).      |
| date_joined   | timestamptz | When the user joined the application.    |
| email         | varchar     | Unique email address for the user.       |
| password      | varchar     | Hashed password for the user's account.  |
| role          | varchar     | Role of the user.                        |
| date_of_birth | date        | The date of birth of the user.           |

## Member Logs
| Field                | Type     | Description                                |
|----------------------|----------|--------------------------------------------|
| ID                   | int8     | The primary key (auto-incremented).        |
| payment_status       | varchar  | Payment status of the member.              |
| membership_approved  | bool     | If the member is approved.                 |
| attendance_count     | int4     | How many classes the member has went to.   |
| user_id              | int8     | The Member ID that relates to User model.  |
| prepaid_fees         | int4     | How many fees the member has already paid. |

## Coach Tracking
| Field                   | Type     | Description                                |
|-------------------------|----------|--------------------------------------------|
| ID                      | int8     | The primary key (auto-incremented).        |
| payment_balance         | int4     | Payment status of the member.              |
| numbers_classes_taught  | int4     | If the member is approved.                 |
| user_id                 | int8     | The Coach ID that relates to User model.   |
| last_payment_balance    | int4     | The salary from last month.                |

## Classes Offered
| Field            | Type         | Description                                |
|------------------|--------------|--------------------------------------------|
| ID               | int8         | The primary key (auto-incremented).        |
| class_title      | varchar      | The title of the class.                    |
| instructor_name  | varchar      | The coach full name.                       |
| class_datetime   | timestamptz  | When the class is held.                    |
| participants     | varchar[]    | The members in the class.                  |

## Rooms
| Field            | Type         | Description                                |
|------------------|--------------|--------------------------------------------|
| ID               | int8         | The primary key (auto-incremented).        |
| room_name        | varchar      | The room name for chatting.                |

## Room Users
| Field      | Type  | Description                         |
|------------|-------|-------------------------------------|
| ID         | int8  | The primary key (auto-incremented). |
| room_name  | int8  | The room name for chatting.         |
| user_id    | int8  | The User ID in the room ID.         |

## Messages
| Field          | Type        | Description                         |
|----------------|-------------|-------------------------------------|
| ID             | int8        | The primary key (auto-incremented). |
| room_name      | int8        | The room name for chatting.         |
| user_id        | int8        | The User ID in the room ID.         |
| content        | text        | The content/message description.    |
| class_datetime | timestamptz | The time stamp of the message.      |
| title          | text        | The content/message title.          |
