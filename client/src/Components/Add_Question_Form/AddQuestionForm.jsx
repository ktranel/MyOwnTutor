import React from 'react';

const AddQuestionForm = ({changeType, addOption, alterOption, removeOption, type, answer, options}) =>{
    return(
        <form>
            <div className="form-group">
                <label htmlFor="text">Question Text</label>
                <input type="text" id={'text'}/>
            </div>

            <div className="form-group">
                <label htmlFor="type">Question Type</label>
                <select
                    name="type"
                    id="type"
                    value={type}
                    onChange={changeType} >
                    <option value="">Choose question type</option>
                    <option value="text">text</option>
                    <option value="multiple choice">multiple choice</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="category">Question Category</label>
                <select name="category" id="category">
                    <option value="">Choose category</option>
                    <option value="chemistry">chemistry</option>
                    <option value="math">math</option>
                    <option value="physics">physics</option>
                </select>
            </div>
            {renderType(type, answer, options, addOption, alterOption, removeOption)}
        </form>
    )
};

export default AddQuestionForm;

function renderType(type, answer, options, addOption, alterOption, removeOption){
    if(type === 'text'){
        return(
            <div className="form-group">
                <label htmlFor="answer">Question Answer</label>
                <input type="text" id={'answer'} value={answer}/>
            </div>
        )
    }else if(type === 'multiple choice'){
        return(
            <div>
                <hr/>
                <h5>Add Option <i onClick={addOption} className="red fas fa-plus-circle"></i></h5>
                <div className="row">
                    <div className="col-8"><h6 className="red">Option Text</h6></div>
                    <div className="col-2"><h6 className="red">Answer</h6></div>
                </div>
                {options.length > 0 ? renderMultipleChoice(options, alterOption, removeOption) : null}
            </div>
        )
    }
}

function renderMultipleChoice(options, alterOption, removeOption){
    return options.map(option=>{
        return(
            <div key={option.id} className={`row`}>
                <div className="col-8">
                    <input type="text" value={option.option} onChange={e=>{
                        const new_option = {id:option.id, option:e.target.value, answer:option.answer};
                        alterOption(new_option);
                    }}/>
                </div>
                <div className="col-2">
                    <input type="checkbox" checked={option.answer} onChange={e=>{
                        const new_option = {id: option.id, option: option.option, answer: !option.answer};
                        alterOption(new_option);
                    }}/>
                </div>
                <div className="col-2">
                    <i onClick={()=>removeOption(option.id)} className="fas fa-times"></i>
                </div>
            </div>
        )
    })
}