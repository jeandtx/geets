import React from 'react';
import 'bulma/css/bulma.min.css';


interface SideProjectPost {
  _id: {
    $oid: string;
  };
  Time: {
    $date: string;
  };
  Title: string;
  Hook: string;
  Theme: string;
  Description: string;
  Media: string;
  Labels: string[];
  Participants: number;
}

interface SideProjectUser {
  _id: {
    $oid: string;
  };
  Name: string;
  Email: string;
  media: string;
  Posts: string;
  Rating: number;

}

interface SideProjectCardProps {
  post: any;
  user: any;
}

export const SideProjectCard: React.FC<SideProjectCardProps> = ({ post, user}) => {
  return (
    // Parent container with horizontal layout, rounded corners, shadow, and a defined maximum width
    <div className="flex max-w-2xl rounded overflow-hidden shadow-lg">

      {/* Image container with a relative size */}
      <div className="w-2/5">
        <img className="w-full h-full object-cover" src={post.Media ? post.Media : "https://bulma.io/images/placeholders/1280x960.png"} alt="Placeholder image" />
      </div>

      {/* Text content container with padding and background color */}
      <div className="w-3/5 p-2 bg-gray-100">
        {/* put a rounded image placer for user.media */}
        <div className="flex items-center mb-4">
          <img className="w-12 h-12 rounded-full mr-4" src={user.Media ? user.Media : "https://bulma.io/images/placeholders/96x96.png"} alt="Placeholder image" />
          <div>
            {/* put user.Name and next of it the user.Rating over 5*/}
            <p className="text-lg text-gray-900 font-bold">{user.Name} {user.Rating}/5</p>


            {/* <p className="text-lg text-gray-900 font-bold">{user.Name}</p>  */}
            <p className="text-sm text-gray-600">{user.Email}</p>
            {/* write the number of posts  */}
            <p className="text-sm text-gray-600">{user.Posts} posted projects</p>
          </div>
        </div>
        {/*make a new div for the content with padding*/}

        <div className="p-2">
        <h2 className="text-2xl font-bold mb-2">{post.Title}</h2>
        <p className="text-base text-gray-700 underline mb-1">{post.Hook}</p>
        <p className="text-gray-700 mb-0">{post.Description}</p>
        <p className="text-sm text-gray-600 mt-4"><time dateTime={post.Time.$date}>{new Date(post.Time.$date).toLocaleDateString()}</time></p>
        </div>
      </div>

    </div>
  );
}