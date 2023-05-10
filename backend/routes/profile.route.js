let mongoose = require("mongoose")
let express = require("express")
let router = express.Router();

// Student Model
let profileSchema = require("../models/Profile");


// GET Profiles
router.get("/", async (req, res, next) => {

    // Null checking all variables
    let limit = req.query.limit && req.query.limit !== "" ? Number(req.query.limit) : 10;
    let offset = req.query.offset && req.query.offset !== "" ? Number(req.query.offset) : 0
    let search = req.query.search && req.query.search !== "" ? req.query.search : '';
    let sortdir = req.query.sortdir ? req.query.sortdir : null
    let sortval = req.query.sortval ? req.query.sortval : null

    // Validating sortingData and making the data usable
    const sortingData = {}
    sortingData[sortval] = sortdir === "desc" ? -1 : sortdir === "asc" ? 1 : null;

    // Conditionally setting params
    let params = sortdir && sortval ? { skip: offset, limit, sort: sortingData } : { skip: offset, limit }

    // Regex for partial search
    let regex = new RegExp(search,'i');

    // Main Functionality
    profileSchema.find(search !== '' ? { 
        $text : { 
            $search : regex
        } 
    } : {},
        {}, params, function (err, items) {
            if (err) {
                return next(err);
            }

            profileSchema.count({}, function (err, count) {
                if (err) {
                    return next(err);
                }

                // Returning the response
                res.send({ count: count, profile: items });
            });
        });

});


module.exports = router;