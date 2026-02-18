Datalagring – Fullstack CRUD med ASP.NET Core & React

Projektbeskrivning

Detta projekt är en fullstack-applikation byggd med:
	•	ASP.NET Core Minimal API
	•	Entity Framework Core (Code First)
	•	PostgreSQL
	•	React (Vite)
	•	xUnit för testning

Applikationen hanterar kurser och möjliggör:
	•	Skapa kurs
	•	Hämta kurser
	•	Uppdatera kurs
	•	Ta bort kurs

Projektet är uppbyggt enligt en lagerindelad arkitektur:
	•	Domain – Entiteter och affärslogik
	•	Infrastructure – Databas och EF Core
	•	API – Minimal API endpoints
	•	Frontend – React-klient
	•	Tests – Integrationstest

Arkitektur

Frontend (React)
⬇
ASP.NET Core Minimal API
⬇
Entity Framework Core
⬇
PostgreSQL

Databas
	•	Code First med EF Core
	•	PostgreSQL
	•	Datamodell normaliserad till 3NF
	•	Relationer hanteras korrekt (inkl. många-till-många via join-tabell)

Hur man kör projektet

1. Starta databasen

Se till att PostgreSQL är igång och att connection string i appsettings.json är korrekt.

Kör migrationer:
dotnet ef database update

2. Starta API

Gå till API-projektet:
dotnet run

API startar normalt på:
http://localhost:5004

3. Starta Frontend

Gå till frontend-mappen:
npm install
npm run dev

Frontend körs på:
http://localhost:5174

CORS är konfigurerat för att tillåta kommunikation mellan frontend och backend.

Tester

Projektet innehåller minst ett integrationstest som verifierar att API:t fungerar.

Kör tester med:
dotnet test

Testet verifierar att:
	•	API startar korrekt
	•	POST /courses fungerar
	•	Korrekt HTTP-status returneras

Funktionalitet
	•	✔ GET /courses
	•	✔ POST /courses
	•	✔ PUT /courses/{id}
	•	✔ DELETE /courses/{id}
	•	✔ React UI för att hantera kurser
	•	✔ Integrationstest

Tekniker
	•	.NET 8
	•	ASP.NET Core Minimal API
	•	Entity Framework Core
	•	PostgreSQL
	•	React + Vite
	•	xUnit