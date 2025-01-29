# LIFTA <img src="https://i.imgur.com/nSWBL7M.png" alt="LIFTA" width="42" />

Welcome to LIFTA! Your go-to spot for personalized fitness and nutrition, connecting you with awesome coaches.

## What is Lifta? <img src="https://i.imgur.com/Fb9YxRg.png" width="28" />

Lifta is a website designed for online gym and nutrition coaching. It allows coaches to share content like meals and exercises, create personalized plans for clients, and deliver customized diets and workout routines. Clients can browse a library of gym coaches and nutrition coaches, know each coach's rating, and subscribe to their preferred coach. By sharing their preferences, goals, and medical details, clients enable coaches to craft tailored programs that meet their specific needs.
## Who Should Care? <img src="https://i.imgur.com/1GAn0Ir.png" width="28" />

- *Gym Coaches*: Looking for a platform to share workout routines, track client progress, and provide personalized coaching.

- *Nutrition Coaches*: Interested in delivering customized diet plans, managing client preferences, and offering nutrition guidance.

- *Clients*: Seeking personalized fitness and nutrition plans, the ability to choose coaches based on ratings, and an easy way to track their goals.

## Key Features <img src="https://i.imgur.com/yzknnL8.png" width="28" />

### Coaches Features <img src="https://i.imgur.com/hzABBQp.png" width="24" />

- Show their qualifications and information on a personalized profile page.
- Approve or reject subscription requests from clients.
- Add content (e.g., exercises, ingredients, meals) to their library for creating custom workouts and diets.
- Set up different subscription packages, including prices and durations.
- View a list of their clients.
- Access individual client fitness profiles (including preferences and medical details).
- Craft personalized workout and meal plans using their content library.
- Assign workout and diet plans to clients.
- Send real-time messages and updates to clients.
- Monitor client progress over time.
- Review client feedback and ratings.
- Remove clients from their list if needed.
- Modify any of the above content or settings.

### Clients Features <img src="https://i.imgur.com/lvsr22v.png" width="24" />

- Show personal information, preferences, goals, and health conditions on their profile.
- Browse and explore available gym coaches and nutrition coaches.
- Subscribe to any available gym or nutrition (or maybe both) package.
- Access daily workout plans assigned to them.
- View personalized diet programs created by their nutrition coach.
- Log their workouts and meals for tracking purposes.
- Monitor their progress over time.
- Send real-time messages to their coaches for guidance and support.
- Rate and review their coaches based on their experience.
- Unsubscribe from any program whenever needed.

### Admin Features <img src="https://i.imgur.com/tEvmlUx.png" width="24" />

- Add new admins to the platform.
- Add gym coaches and clients to the system.
- Access a list of all user details.
- View coaches and trainees with the most subscriptions.
- Remove users from the platform when necessary.
- Ban users for violating platform policies.
- Display key statistics (e.g., top subscription packages, most popular package types, active subscriptions count).


## Tech Stack <img src="https://i.imgur.com/e1DBlTk.png" width="28" />

- *Frontend:* <img src="https://i.imgur.com/ZAdKucE.png" width="14" /> React, <img src="https://i.imgur.com/pGFocao.png" width="16" /> Tailwind and <img src="https://i.imgur.com/hj45tsb.png" width="14" /> Figma
- *Backend:* <img src="https://i.imgur.com/RebLs7F.png" width="20" /> Node.js and Express.js
- *Database:* <img src="https://i.imgur.com/fwgXa3k.png" width="16" /> PostgreSQL

## Design <img src="https://i.imgur.com/e7qaSLT.png" width="28" />

- *ER Diagram and Schema*: Check Documents Folder!
- *[Figma Design](https://www.figma.com/design/OCdcViHf5ZI6HYikgwRjaJ/Lifta?node-id=4424-16994&t=6JjsNFCTxEgSsOXS-1)*

## Setup Instructions <img src="https://i.imgur.com/DRfWA84.png" width="28" />

1. Clone the repository:
    
    ```bash
    git clone https://github.com/OmarGamal10/Lifta.git
    ```
    
2. Navigate to the project directory:
    
    ```bash
    cd Lifta
    ```
    
3. Install dependencies for both the backend and frontend:
    
    ```bash
    cd server
    npm install
    cd ../FrontEnd
    npm install
    ```
	
4. Create the database:
	- Run the database schema script in the lifta_schema.sql file in pgAdmin
	
5. Configure connection details:
    -  Create config.env file inside the server folder and configure connection details as follows:
    
	```
	NODE_ENV=development
	PORT=3000
	DATABASE_PASSWORD=your_database_password
	SECRETKEY=your_secret_key
	```
	
6. Start the backend server:
	
    ```bash
    cd server
    npm start
    ```
    
7. Start the frontend server:
    
	```bash
    cd FrontEnd
    npm run dev
    ```
    
8. Access the application at http://localhost:5173.

## Future Features <img src="https://i.imgur.com/8i5qWJE.png" width="28" />

- Notifications and reminders for users.
- Integration of real payment methods.
- Option for coaches to create organizations consisting of multiple coaches with shared packages.

## Contributors <img src="https://i.imgur.com/SfBB4jV.png" width="28" />

| <a href="https://avatars.githubusercontent.com/shady-2004?v=4"><img src="https://avatars.githubusercontent.com/shady-2004?v=4" alt="Shady Mohamed" width="150"></a> | <a href="https://avatars.githubusercontent.com/Mag-D-Anas?v=4"><img src="https://avatars.githubusercontent.com/Mag-D-Anas?v=4" alt="Anas Magdy" width="150"></a> | <a href="https://avatars.githubusercontent.com/Alyaa242?v=4"><img src="https://avatars.githubusercontent.com/Alyaa242?v=4" alt="Alyaa Ali" width="150"></a> | <a href="https://avatars.githubusercontent.com/OmarGamal10?v=4"><img src="https://avatars.githubusercontent.com/OmarGamal10?v=4" alt="Omar Gamal" width="150"></a> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                           [Shady Mohamed](https://github.com/shady-2004)                                                            |                                                           [Anas Magdy](https://github.com/Mag-D-Anas)                                                            |                                                          [Alyaa Ali](https://github.com/Alyaa242)                                                           |                                                            [Omar Gamal](https://github.com/OmarGamal10)                                                            |
