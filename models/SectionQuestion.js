'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('section_question', {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            section_id:{
                //fk from the section table
                type: Datatypes.INTEGER,
                required:true,
                allowNull:false
            },
            question_id: {
                // fk from question table
                type: Datatypes.UUID,
                required: true,
                allowNull: false,
            },
            updated_at:{ type: Datatypes.DATE},
            deleted_at:{ type: Datatypes.DATE}
        },
        {
            underscored:true,
            paranoid:true
        });
};