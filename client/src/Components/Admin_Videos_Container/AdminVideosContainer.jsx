import React from 'react';
import { DateTime} from 'luxon';
import AdminVideoList from '../Admin_Video_List/AdminVideoList';

const videos = {
    videos:[
        {
            id: 123,
            title: "Atoms and Molecules",
            description: "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.",
            author: "Kyle Tranel",
            uploaded: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
        },
        {
            id: 2232,
            title: "Stoichiometry and the fun stuff",
            description:'Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.',
            author: "Kyle Tranel",
            uploaded: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
        }
    ],
    page:1,
    pages:10
};

const AdminVideosContainer = () =>{
    return (
        <div>
            <h3 className={`lgtBlue`}>Videos <i className="red fas fa-plus-circle"></i></h3>
            <AdminVideoList videos={videos.videos}/>
        </div>
    )
};

export default AdminVideosContainer;