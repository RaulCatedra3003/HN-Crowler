# Technical Design Review

## 🔮 Overview 🔮

The aim of this project is to create a API to get news info crowling Hackers News.

## ⚓ General requirements ⚓

- The API only have one endpoint.
- In this endpoint can recive one number, if it don't recive any by default it be 1.
- This name is the number of pages the user want to get news information about.
- The API response needs to be an array that if the user get to / have 30 object for the 30 news and if the user get to /3 the array may have 90 objects.
- For each new, the object need to contain the next info:
  - Title,
  - URL,
  - Points,
  - User who send the news,
  - Age of the new,
  - Number of comments. 
- When all of this will be working, need to create a server cache to save the pages prebiously crowled tith a expire time of 5 minutes, adn when the http reques include this cached info, send directly.


## ⚙️ Specific requirements ⚙️

- Its important to have test in the code.


## 🧬 Project Structure 🧬

In the root folder you can find the [documentation](../Documentation) and the general project configuration.
The src folder includes the project code.


## Whit ❤ [Raúl Cátedra](https://github.com/RaulCatedra3003)
