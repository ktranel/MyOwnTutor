'use strict';

module.exports= (sequelize, Datatypes)=>{
    return sequelize.define('user', {
        id:{
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue:Datatypes.UUIDV4
        },
        first_name:{
            type: Datatypes.STRING,
            isAlphanumeric:true,
            required:true,
            allowNull:true
        },
        last_name:{
            type: Datatypes.STRING,
            required:true,
            allowNull:true
        },
        username:{
            type:Datatypes.STRING,
            required:true,
            allowNull:true,
            len:[8, 20]
        },
        password:{
            type:Datatypes.STRING,
            required:true,
            allowNull:true,
            len:[8, 20]
        },
        email:{
            type:Datatypes.STRING,
            required:true,
            allowNull:true,
            len:[7, 100],
            isEmail:true
        },
        permission_id:{
            //fk in permission table
            type:Datatypes.INTEGER,
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