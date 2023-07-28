# SwiftWave React Frontend
Built with Vite + React

This is a simple front end application that works together with a NodeJS/Express backend. 

### Key features
**Home page:** the homepage shows a total of 25 items per page
![alt text](https://i.imgur.com/L0poerI.png "Homepage")

**Filters:** filters the items based on the given condition. 

![alt text](https://i.imgur.com/IKBAhAP.png "Filters")

*Each filter change will make a request to the backend server*

**Order by:** will order the requested items, works with filters as well

![alt text](https://i.imgur.com/fYwaAx5.png "Order by")

For example, we can filter out Video Game Consoles which dont exceed 500 USD
![alt text](https://i.imgur.com/pN1pJdi.png "Video Game Consoles under 500")

**Pagination:** the backend gives the data in chunks of 25 items per page
![alt text](https://i.imgur.com/0pztMtZ.png "Pagination")

*The numbers in the pagination dinamically change depending on the size of the filters, meaning that if there are a total of 75 items, only two pages will be displayed*

![alt text](https://i.imgur.com/sdPg94C.png "Pagination")

*If there are more than 5 pages, the pagination will show three dots "..."*

**Individual item page:** each item has their own item page, which contains its full article name, a definition, larger image and the ability to add the item to the cart

![alt text](https://i.imgur.com/C0X1GnD.png "Individual item page")

**Popular items:** some items are marked as popular in the database, those items have their special section with only other popular items
![alt text](https://i.imgur.com/OrktRw7.png "Popular items")

*The popular items will also have this little message on their individual item page, right next to the like button*
![alt text](https://i.imgur.com/pxIZJ28.png "Popular item message")

**Search:** searches for specific items
![](https://i.imgur.com/TKTcebL.gif)
![alt text](https://i.imgur.com/trRaEGE.png "Search")

*If no item is found, will return a 404*
![alt text](https://i.imgur.com/6Rw0MvX.png "404")

**Cart:** Simply stores the users selected items.
![alt text](https://i.imgur.com/qxu225r.png "Cart")
![](https://i.imgur.com/cpbR1zn.gif)

*If the user is logged in, the cart will be stored in the database and persisted there, if not logged in, the cart will be stored in the local storage and persisted until it gets deleted*
