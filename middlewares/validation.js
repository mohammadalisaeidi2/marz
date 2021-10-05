import Joi from 'joi';
import JoiError from "../Exceptions/validationError";

export const adminLoginValidation = (data, res, next) => {
    try {
        console.log("-----adminLoginValidation-----")
        const schema = Joi.object({
            adminUsername: Joi.string().required().min(3),
            adminPassword: Joi.string().required().min(8)
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["kh444"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}
export const teacherLoginValidation = (data, res, next) => {
    try {
        console.log("-----adminLoginValidation-----")
        const schema = Joi.object({
            teacherUsername: Joi.string().required().min(3),
            teacherPassword: Joi.string().required().min(8)
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["kh444"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}
export const teacherRegisterValidation = (data, res, next) => {
    try {

        console.log("----teacherRegisterValidation----")
        const schema = Joi.object({
            teacherName: Joi.string().required().min(3),
            teacherEmail: Joi.string().required().min(3).email(),
            teacherUsername: Joi.string().required().min(3),
            teacherPassword: Joi.string().required().min(8),
            teacherFamily: Joi.string().required().min(3),
            teacherAddress: Joi.string().required().min(3),
            teacherInfo: Joi.string().required().min(3),
            teacherAge: Joi.string().required().max(3),
            teacherNationCode: Joi.string().required().max(10).min(10),
            teacherPhoneNumber: Joi.string().required().min(11).max(11)
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["kh444"]}
        )) : next();
    } catch (e) {
        next(e);
    }
}


export const studentRegisterValidation = (data,res,next) => {
    try {


        console.log("----------studentRegisterValidation-------------");


        const schema = Joi.object({
            studentName: Joi.string().min(3).max(30).required(),
            studentFamily: Joi.string().min(3).max(35).required(),
            studentPassword: Joi.string().min(8).required(),
            studentPhoneNumber: Joi.string().min(11).max(11).required(),
            studentEmail: Joi.string().min(10).max(35).required().email(),
            studentNationCode: Joi.string().min(10).max(10),
            studentAddress: Joi.string().max(120),
            studentAge: Joi.string().min(2).max(2).required()
        });
        //return schema.validate(data);
        const result = schema.validate(data.body);

        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }



}


export const studentLoginValidation = (data,res,next) => {
    console.log("----------studentLoginValidation-------------");


    try {



        const schema = Joi.object({
            studentEmail: Joi.string().min(10).max(35).required().email(),
            studentPassword: Joi.string().min(8).required()
        });
        //return schema.validate(data);
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}
export const teacherTextLearnValidation = (data,res,next) => {
    console.log("----------teacher TextLearn Validation-------------");


    try {



        const schema = Joi.object({
            title:Joi.string().min(3).required(),
            body:Joi.string().required(),
            date:Joi.date()
        });

        //return schema.validate(data);
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}


export const adminTextLearnValidation = (data,res,next) => {
    console.log("----------teacher TextLearn Validation-------------");


    try {



        const schema = Joi.object({
            title:Joi.string().min(3).required(),
            body:Joi.string().required(),
            date:Joi.date()
        });

        //return schema.validate(data);
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}




export const slideShowValidation = (data,res,next) => {
    console.log("----------SLIDESHOW Validation-------------");
    try {
        const schema = Joi.object({
            title:Joi.string().min(3).required(),
            body:Joi.string().required(),
            date:Joi.date()
        });

        //return schema.validate(data);
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}



export const collaborationValidation = (data,res,next) => {
    console.log("----------COLLABORATION Validation-------------");
    try {
        const schema = Joi.object({
            name:Joi.string().min(3).required(),
            description:Joi.string(),
            date:Joi.date()
        });

        //return schema.validate(data);
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}





