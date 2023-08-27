# PurpleChem

https://purple-chem.vercel.app/

An inventory management system for chemistry researchers built using SvelteKit/JavaScript (frontend), deployed on Vercel, and FastAPI/Python (backend), deployed on DigitalOcean (see [PurpleChemAuth](https://github.com/CROpie/PurpleChemAuth) & [PurpleChemData](https://github.com/CROpie/PurpleChemData)).

Integration tests via vitest, the [@testing-library](https://testing-library.com/) and [msw](https://mswjs.io/) have been incorporated to ensure the intregrity of the application.

Some features have been replicated using [React.js](https://github.com/CROpie/PurpleChemReact)

[Git Projects](https://github.com/users/CROpie/projects/2) was used to drive the development of the project.

## Features

- The process of ordering a chemical incorporates an api call to [commonchemistry](https://commonchemistry.cas.org/), retrieving strucutral and physical properties of the chemical to be ordered, which are stored on the database when the order is placed.
- A personal inventory allows for a user-friendly way for researchers to keep track of where their chemicals are located in their personal space, as well as how how much material remains, and easy access to physicals properties.
- The entire database of orders can be searched by researcher name, CAS number, chemical name and by **structure**.
- Logging in as an admin provides extra features such as adding users, modifying users, chemicals and orders, and importing orders via a .csv file.
- Light and dark themes with corresponding colour palettes have been provided for the users.

## Auth via FastAPI/Auth0

Log in using the company email and password. Administrative privileges are required to add new users. To see the application in action, please log in with either:

- **email:** chris@purplechem.com, **pass:** default
- **email:** admin@purplechem.com, **pass:** default

## Inventory

Optimized for use in both mobile and desktop environments, researches are provided a user-friendly interface to look after their ordered chemicals. Personal storage locations can be added by the researcher to reflect their working space. The amount remaining and storage location can be modified, to ensure that the chemist and co-workers can keep track of the current status of the inventory. Physical properties and the structure of the chemical are provided for reference.

New orders are given a 'submitted' status by default. Administrative privileges are required to change this status to 'ordered' and 'received'. A button is provided in the Inventory page in this version of the application for the researcher to instantly change the status of the order.

## Order Chemical

New orders begin with the input of a CAS number or chemical name, which are used to query the CAS online database called [commonchemistry](https://commonchemistry.cas.org/). If the chemical is known, phycial and structural properties will be automatically included in the order form. The amount of the chemical and suppler information will need to be manually inputted before submitting the order.

In the case that the CAS number or chemical name is not known by commonchemistry, the researcher may draw the structure themselves using the [JSME editor](https://jsme-editor.github.io/). Physical properties may also be added if desired.

Chemicals are stored in their own table in the database, and are refered to in the orders table by foreign key. A repeated order of a chemical will incorporate this foreign key. All orders have their own unique reference number which is used to keep track of the particular instance of a chemical.

Structural information is stored in both smile and inchi formats.

## Query Database

The entire database of orders can be queried by partical matches to researcher, CAS number and chemical name. A researcher may also query the database by drawing the **chemical structure**. The list can then be sorted by any of the provided table head labels. Chemicals that have been completely consumed are not listed by default, but may be displayed in the table if desired.

## Admin Tools

Reserchers are unable to modify orders (aside from amount remaining and personal inventory location), chemical information or researcher information. The ability to do so is provided to administrative users (eg supervisors, lab heads & IT staff). Administrators are able to add new users into the system. Additionally, the database may be readily populated using a CSV file containing the appropriate fields. Importing a CSV file has been optimized and is performed in a highly efficient manner.
