# PurpleChem

An inventory management system for chemists built using SvelteKit, using Supabase for the backend (Auth/Database).

## Features

- Ordering a chemical incorporates an api call to commonchemistry, retrieving strucutral and physical properties of the chemical to be ordered, which are stored on the database.
- A personal inventory allows for a user-friendly way for researchers to keep track of where their chemicals are located in their personal space, as well as how how much material remains, and easy access to physicals properties.
- The entire database of orders can be searched by researcher, CAS number, chemical name and **structure**.
- Logging in as an admin gives extra features such as adding users, modifying users, chemicals and orders, and importing orders via a .csv file.
- Vitest with the @testing-library has been incorporated to ensure the intregrity of the application.
- Light and dark themes with corresponding colour palettes have been provided for the users.

## Auth via Supabase

Log in using the company email and password. Administrative privileges are required to add new users. To see the application in action, please log in with either:

- **email:** chris@purplechem.com, **pass:** default
- **email:** admin@purplechem.com, **pass:** default

## Inventory

Optimized for use in both mobile and desktop environments, researches are provided user-friendly interface to look after their orders. Personal storage locations can be added by the researcher to reflect their personal space. The amount remaining and storage location can be modified, to ensure that the chemist and co-workers can keep track of the current status of the inventory. Physical properties and the structure of the chemical are provided for reference.
New orders are given a 'submitted' status by default. Administrative privileges are required to change this status to 'ordered' and 'received'. A button is provided in the Inventory page in this version of the application for the researcher to instantly change the status of the order.

## Order Chemical

New orders begin with the input of a CAS number, which is used to query the CAS online database called [commonchemistry](https://commonchemistry.cas.org/). If the chemical is known, phycial and structural properties will be automatically included in the order form. The amount of the chemical, as well as supplier and supplier reference number will need to be manually inputted before submitting the order.

In the case that the CAS number is not known by commonchemistry, the researcher can draw the structure themselves using the [JSME editor](https://jsme-editor.github.io/). Physical properties may be added if desired.

Chemicals are stored in their own table in the database. Repeated orders of a chemical will detect that the chemical is already in the database, and just find the reference number. All orders have their own unique reference number which is used to keep track of the particular instance of a chemical.

Structural information is stored in both smile and inchi formats.

## Query Database

The entire database of orders can be queried by researcher, CAS number, chemical name (partical matches are accpeted) and **structure** (via the inchi string format). The list can then be sorted by any of the provided table head labels. Consumed chemicals (amount = 0) can be filtered off if desired.

## Admin Tools
