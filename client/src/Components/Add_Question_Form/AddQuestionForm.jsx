import React from 'react';

const AddQuestionForm = ({title, changeTitle, changeCategory, changeType, addOption, alterOption, removeOption, alterAnswer, type, answer, options, errors}) =>{
    return(
        <form onSubmit={ (e) => e.preventDefault() }>
            <div className="form-group">
                <label htmlFor="text">Question Text</label>
                <input type="text" id={ 'text' } value={ title } onChange={ e=> changeTitle(e.target.value) }/>
                { errors.title ? <span><i className='red'><i class="fas fa-exclamation"></i> Title is required</i></span> : null }
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
                { errors.type ? <span><i className='red'><i class="fas fa-exclamation"></i> Type is required</i></span> : null }
            </div>

            <div className="form-group">
                <label htmlFor="category">Question Category</label>
                <select name="category" id="category" onChange={e => changeCategory(e.target.value)}>
                    <option value="">Choose category</option>
                    <option value="chemistry">chemistry</option>
                    <option value="math">math</option>
                    <option value="physics">physics</option>
                </select>
            </div>
            {renderType(type, answer, alterAnswer, options, addOption, alterOption, removeOption, errors)}
        </form>
    )
};

export default AddQuestionForm;

function renderType(type, answer, alterAnswer, options, addOption, alterOption, removeOption, errors){
    if(type === 'text'){
        return(
            <div className="form-group">
                <label htmlFor="answer">Question Answer</label>
                <input type="text" id={'answer'} value={answer} onChange={e=>alterAnswer(e.target.value)}/>
                { errors.answer ? <span><i className='red'><i class="fas fa-exclamation"></i> An answer is required</i></span> : null }
            </div>
        )
    }else if(type === 'multiple choice'){
        return(
            <div>
                <hr/>
                <h5>Add Option <i onClick={addOption} className="red fas fa-plus-circle"></i></h5>
                { errors.optionLength ? <span><i className='red'><i class="fas fa-exclamation"></i> Multiple choice questions must have at least 2 choices</i><br/></span> : null }
                { errors.answer ? <span><i className='red'><i class="fas fa-exclamation"></i> 1 choice must be selected as an answer</i><br/></span> : null }
                { errors.emptyOption ? <span><i className='red'><i class="fas fa-exclamation"></i> 1 or more options is empty</i><br/></span> : null }
                <div className="row">
                    <div className="col-8"><h6 className="drkBlue">Option Text</h6></div>
                    <div className="col-2"><h6 className="drkBlue">Answer</h6></div>
                </div>
                {options.length > 0 ? renderMultipleChoice(options, alterOption, removeOption) : null}
            </div>
        )
    }
}

function renderMultipleChoice(options, alterOption, removeOption){
    return options.map(option=>{
        return(
            <div key={option.id} className={`row m-b:1`}>
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