const Visitor = require('../../models/newVisitor');




function addNewVisitor(visitorInfo) {
    const visitor = new newVisitor(visitorInfo);
    visitor.save()
}


module.exports = {
    async addNewVisitor(req,res,next){
        const data = req.body;
        const visitor = new Visitor(data);
        await visitor.save();
        next();
    },
    async getVisitor(req,res,next){
        const data = req.body;
        const visitor = await Visitor.find({name:data.name, timeOfVisit:data.timeOfVisit});
        res.visitor = visitor[0];
        next();
    }
}

// const data = req.body
//     console.log(data.timeOfVisit)