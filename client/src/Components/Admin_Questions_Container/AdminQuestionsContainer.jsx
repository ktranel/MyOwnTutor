import React, { Component } from 'react';
import AdminQuestionList from '../Admin_Question_List/AdminQuestionList';
import {DateTime} from "luxon";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getAdminQuestionList } from "../../Actions/Question_Actions";
import ReactPaginate from "react-paginate";

const Question_Mock = {
    questions:[
        {
            id:899879,
            type: 'text',
            category: 'Chemistry',
            title: 'What is the circumference of a circle?',
            author: 'Kyle Tranel',
            edited: DateTime.local().toLocaleString(DateTime.DATETIME_MED)
        },
        {
            id:551,
            type: 'text',
            category: 'Chemistry',
            title: 'What is your name?',
            author: 'Kyle Tranel',
            edited: DateTime.local().toLocaleString(DateTime.DATETIME_MED)
        },
        {
            id:4525,
            type: 'multiple choice',
            category: 'Chemistry',
            title: 'Given the following equation, what is the answer to an anonymous question?',
            author: 'Kyle Tranel',
            edited: DateTime.local().toLocaleString(DateTime.DATETIME_MED)
        }
    ],
    page:1,
    pages:5
};

class AdminQuestionsContainer extends Component{
    state = {page: 1};
    componentDidMount() {
        this.props.getAdminQuestionList(1);
    }

    // handle loading pages of videos
    handlePageClick = data => {
        const page = data.selected + 1;
        this.setState({ page }, () => {
            this.props.getAdminQuestionList(this.state.page);
        });
    };

    render(){
        return (
            <div className={'row'}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-md-8"><h5>Questions <Link to={'questions/new'}><i className="red fas fa-plus-circle"></i></Link></h5></div>
                        <div className="d-none d-sm-none d-md-block col-md-2"><h5>Type</h5></div>
                        <div className="d-none d-sm-none d-md-block col-md-2"><h5>Category</h5></div>
                    </div>
                </div>
                <div className={'col-12'}>
                    <AdminQuestionList questions={this.props.questions}/>
                </div>
                <div className="col-12">
                    <ReactPaginate
                        previousLabel={<i className="fas fa-arrow-left"> </i>}
                        nextLabel={<i className="fas fa-arrow-right"> </i>}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.props.pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps({ adminQuestionList }){
    return {
        questions: adminQuestionList.questions || [],
        pages: adminQuestionList.pages || 0,
    };
}

export default connect(mapStateToProps, { getAdminQuestionList })(AdminQuestionsContainer);