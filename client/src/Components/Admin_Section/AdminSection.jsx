import React, {Component} from 'react';
import style from './AdminSection.module.css';
import ContentItem from '../Admin_Content_Item/AdminContentItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class AdminSection extends Component{
    constructor(props){
        super(props);
        const contentIds = props.section.content.map(item=>item.id);
        this.state = {
            maxHeight:0,
            contentIds: contentIds,
        }
    }

    flipHeight = () =>{
        this.setState({
            maxHeight: this.state.maxHeight === 0 ? 1000 : 0
        });
    };
    onDragEnd = (result) => {
        console.log(result);
        const contentId = result.draggableId;
        const destination = result.destination.index;
        const source = result.source.index;
        const order = this.state.contentIds;
        order.splice(source, 1);
        order.splice(destination, 0, contentId);
    };
    render(){
        const css ={maxHeight: this.state.maxHeight};
        return(
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <div>
                    <h5 onClick={this.flipHeight} className={`${style.section_title} red`}>{this.props.title}</h5>
                    <Droppable droppableId={this.props.section.id}>
                        {(provided) => (
                            <div style={css} className={`${style.listing}`} {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    this.props.section.content.map((item, i) => <ContentItem key={item.id} content={item} index={i} />)
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        )
    }
}

export default AdminSection;