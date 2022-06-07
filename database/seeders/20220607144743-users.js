'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName:"Nikita", 
        lastName:"Crook", 
        email:"ncrook0@yolasite.com", 
        password: bcrypt.hashSync("FI8467zr",12), 
        photo:"http://dummyimage.com/196x100.png/ff4444/ffffff", 
        roleId:1, 
        createdAt:new Date(), 
        updatedAt:new Date()
      },
      {
        firstName:"Mannie",
        lastName:"Labern",
        email:"mlabern1@army.mil",
        password: bcrypt.hashSync("XN1772te",12),
        photo:"http://dummyimage.com/213x100.png/cc0000/ffffff",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Urbano",
        lastName:"Atterbury",
        email:"uatterbury2@eepurl.com",
        password: bcrypt.hashSync("HO6303et",12),
        photo:"http://dummyimage.com/223x100.png/5fa2dd/ffffff",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jacky",
        lastName:"Labrom",
        email:"jlabrom3@tumblr.com",
        password: bcrypt.hashSync("FZ7727we",12),
        photo:"http://dummyimage.com/205x100.png/cc0000/ffffff",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Alvira",
        lastName:"Meeks",
        email:"ameeks4@gizmodo.com",
        password: bcrypt.hashSync("JU4299qj",12),
        photo:"http://dummyimage.com/103x100.png/dddddd/000000",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Aila",
        lastName:"Gibling",
        email:"agibling5@about.com",
        password: bcrypt.hashSync("PL1793hv",12),
        photo:"http://dummyimage.com/208x100.png/cc0000/ffffff",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Mariquilla",
        lastName:"Bauldrey",
        email:"mbauldrey6@mayoclinic.com",
        password: bcrypt.hashSync("OF4451sr",12),
        photo:"http://dummyimage.com/207x100.png/ff4444/ffffff",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Cecilla",
        lastName:"Eye",
        email:"ceye7@omniture.com",
        password: bcrypt.hashSync("MV4879sy",12),
        photo:"http://dummyimage.com/207x100.png/cc0000/ffffff",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Courtnay",
        lastName:"Devennie",
        email:"cdevennie8@hugedomains.com",
        password: bcrypt.hashSync("MH0403ik",12),
        photo:"http://dummyimage.com/131x100.png/5fa2dd/ffffff",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Kele",
        lastName:"Blanchflower",
        email:"kblanchflower9@spiegel.de",
        password: bcrypt.hashSync("QW8609xe",12),
        photo:"http://dummyimage.com/167x100.png/dddddd/000000",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Flinn",
        lastName:"Guidoni",
        email:"fguidonia@archive.org",
        password: bcrypt.hashSync("ZW4261km",12),
        photo:"http://dummyimage.com/208x100.png/ff4444/ffffff",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jillian",
        lastName:"Stillert",
        email:"jstillertb@eventbrite.com",
        password: bcrypt.hashSync("BQ8752fg",12),
        photo:"http://dummyimage.com/133x100.png/ff4444/ffffff",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Ainslee",
        lastName:"Bonsul",
        email:"abonsulc@mac.com",
        password: bcrypt.hashSync("VR6866mu",12),
        photo:"http://dummyimage.com/113x100.png/dddddd/000000",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Ernesto",
        lastName:"Took",
        email:"etookd@youtu.be",
        password: bcrypt.hashSync("PF8665ua",12),
        photo:"http://dummyimage.com/158x100.png/dddddd/000000",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jennee",
        lastName:"Partington",
        email:"jpartingtone@washington.edu",
        password: bcrypt.hashSync("XM2633ju",12),
        photo:"http://dummyimage.com/125x100.png/ff4444/ffffff",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Elsbeth",
        lastName:"Stichel",
        email:"estichelf@dagondesign.com",
        password: bcrypt.hashSync("DY5999bp",12),
        photo:"http://dummyimage.com/166x100.png/5fa2dd/ffffff",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jeddy",
        lastName:"Gettins",
        email:"jgettinsg@epa.gov",
        password: bcrypt.hashSync("EB3987yt",12),
        photo:"http://dummyimage.com/227x100.png/cc0000/ffffff",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Shae",
        lastName:"Phillpot",
        email:"sphillpoth@reverbnation.com",
        password: bcrypt.hashSync("KZ4673aw",12),
        photo:"http://dummyimage.com/144x100.png/dddddd/000000",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Fremont",
        lastName:"Horwell",
        email:"fhorwelli@oracle.com",
        password: bcrypt.hashSync("WX2205kv",12),
        photo:"http://dummyimage.com/151x100.png/cc0000/ffffff",
        roleId:1,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Rania",
        lastName:"Wraggs",
        email:"rwraggsj@state.tx.us",
        password: bcrypt.hashSync("CB3973km",12),
        photo:"http://dummyimage.com/193x100.png/cc0000/ffffff",
        roleId:2,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    },
    
    async down (queryInterface, Sequelize) {
      /**
      * Add commands to revert seed here.
      *
      * Example:
      * await queryInterface.bulkDelete('People', null, {});
      */
    }
  };
  