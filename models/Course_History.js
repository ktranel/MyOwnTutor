'use strict';

module.exports= (sequelize, Datatypes)=>{
    return sequelize.define('course_history', {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            user_id:{
                //fk from the user table
                type: Datatypes.UUID,
                required:true,
                allowNull:false
            },
            title:{
                type:Datatypes.STRING,
                required:true,
                allowNull:false
            },
            description:{
                type:Datatypes.STRING,
                required: false,
                allowNull:true,
            },
            status:{
                type:Datatypes.STRING,
                required:true,
                allowNull:false
            },
            version:{
                type:Datatypes.INTEGER,
                required:true,
                allowNull:false,
                defaultValue:0
            },
            course_id:{
                //fk from course table
                type: Datatypes.INTEGER,
                required:true,
                allowNull:false
            },
            updated_at:{ type: Datatypes.DATE},
            deleted_at:{ type: Datatypes.DATE}
        },
        {
            underscored:true,
            paranoid:true
        });
};