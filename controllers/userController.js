const model = require('../models');

exports.newUser = (req, res, next) =>{
    let name = req.body.name;
    let email = req.body.email;

    model.User.create({
        name: name,
        email:email
    }).then (result=>{
        res.status(200).send(result);
    }).catch(error=>{
        req.status(500).send("An error occured");
    });
}

exports.getPost = (req, res, next) =>{
    let userId = req.params.userId;
    model.Post.findOne({
        where: {userId:userId},
        attributes: ['post_title','post_text','status'],
        include: [{
            model:model.Tag,
            as:'tags',
            attributes: ['id','tag_text']
        }]
    }).then (result=>{
        res.status(200).send(result);
    }).catch (error=>{
        console.log(error)
        res.status(500).send(error);
    });
}

exports.newPost = async (req, res, next) =>{
    let userId = req.params.userId;
    let post_title = req.body.post_title;
    let post_text = req.body.post_text;
    let status = true;
    let tag_text = req.body.tag_text;

    //t is a transaction
    let t;
    //a javascript object to hold the message to be sen to the client
    let message = {};
    try {
        //Start transaction 
        t = await model.sequelize.transaction();
        //insert a record in post, but results will not be saved permanently 
        const postResult = await model.Post.create({
            post_title:post_title,
            post_text:post_text,
            status:status,
            userId:userId
        },{
            transaction:t
        });
        //insert a record in tags, but results will not be saved permanently 
        const tagResult = await model.Tag.create({
            tag_text:tag_text
        },
        {
            transaction:t 
        });
        post_id = postResult.id;
        tag_id = tagResult.id;
        //insert a record in posttags, but results will not be saved permanently 
        const postTagResult = await model.PostTag.create({
            post_id: post_id,
            tag_id: tag_id
        },{
            transaction:t  
        });

        await t.commit();
        message ['message'] = 'Records added';
        res.status(201).json(message);
    } catch (error) {
        console.log(error);
        t.rollback(); 
        message ['message'] = 'Records not added';
        res.send(message);
    }
}
