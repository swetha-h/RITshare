const path = require("path");
const fs = require("fs");
const eventModel = require("../models/events");
var formidable = require("formidable");

module.exports = {
  index: function (req, res, next) {
    eventModel.find({}, function (err, events) {
      if (err) {
        res.header("Content-Type", "application/json");
        res.status(500).send(JSON.stringify(error, null, 4));
      }
      console.log(events);
      res.render("events", { events: events });
    });
  },
  getCreate: function (req, res, next) {
    res.render("eventCreate");
  },
  postCreate: function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.image_poster.filepath;
      var ext = path.extname(files.image_poster.originalFilename);
      var newpath = path.join(
        __dirname,
        `../public/images/${fields["no"]}${ext}`
      );
      fs.rename(oldpath, newpath, function (error) {
        if (error) {
          console.log(error);

          res.header("Content-Type", "application/json");
          res.status(500).send(JSON.stringify(error, null, 4));
          return;
        }
      });
      fields["image_path"] = `/images/${fields["no"]}${ext}`;
      const saveEvent = new eventModel(fields);
      saveEvent.save((error, savedEvent) => {
        if (error) {
          console.log(error);
          res.header("Content-Type", "application/json");
          res.status(500).send(JSON.stringify(error, null, 4));
        }
        //res.json(savedEvent);
        res.redirect("/events");
      });
    });
  },
  getDelete: function (req, res, next) {
    res.render("eventDelete");
  },
  postDelete:function (req, res, next) {
    const deleteEvent = new eventModel(req.body);
    console.log(req.body);
    eventModel.remove({"name":deleteEvent.name}, function(err, result) {
      res.send({msg:'error'+err}) 
      // res.send( (result === 1)? { msg: 'Deleted' } : { msg: 'error: '+ err } );
  });
  },
};