import { useBorrowBookMutation, useDeleteBookMutation, useGetBooksQuery, useUpdateBookMutation } from "@/redux/api/baseapi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { toast } from "sonner";
import Updatebook from "./updateBook";
import BorrowBook from "./borrowBook";


 
const BookCard = ({ book } ) => {
  const genreColors  = {
    FICTION: "bg-blue-100 text-blue-800",
    NON_FICTION: "bg-green-100 text-green-800",
    SCIENCE: "bg-purple-100 text-purple-800",
    HISTORY: "bg-amber-100 text-amber-800",
    BIOGRAPHY: "bg-pink-100 text-pink-800",
    FANTASY: "bg-indigo-100 text-indigo-800"
  };
     const  {refetch}= useGetBooksQuery(undefined)


  const [deleteBook] = useDeleteBookMutation();


  const handleDelete = async (id) => {
    try {
      await deleteBook(id)
      refetch()
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };


 

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold leading-tight mb-1">
              {book.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              by {book.author}
            </CardDescription>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ml-2 ${genreColors[book.genre]}`}>
            {book.genre.replace('_', ' ')}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {book.description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {book.description}
          </p>
        )}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>ISBN: {book.isbn}</span>
          <span>{book.copies} copies</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${book.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${book.available ? 'text-green-700' : 'text-red-700'}`}>
              {book.available ? 'Available' : 'Checked Out'}
            </span>
          </div>
          <div className="flex gap-4">
            <button 
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              book.available 
                ?'' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!book.available}
          >
            {book.available ? <BorrowBook name={book.title} _id={book._id} isbn={book.isbn}/> : 'Unavailable'}
          </button>
          <button 
          onClick={()=>handleDelete(book._id)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors bg-red-600  text-rose-200  `}
            
          >
            Delete
          </button>
          <Updatebook book={book}/>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;