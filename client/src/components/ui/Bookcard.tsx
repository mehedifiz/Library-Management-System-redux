import { useState } from "react";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseapi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { toast } from "sonner";
import Updatebook from "./updateBook";
import BorrowBook from "./borrowBook";
import type { IBook } from "@/types/types";

// Confirmation Dialog Component
const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const BookCard = ({ book }: { book: IBook }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const genreColors = {
    FICTION: "bg-blue-100 text-blue-800",
    NON_FICTION: "bg-green-100 text-green-800",
    SCIENCE: "bg-purple-100 text-purple-800",
    HISTORY: "bg-amber-100 text-amber-800",
    BIOGRAPHY: "bg-pink-100 text-pink-800",
    FANTASY: "bg-indigo-100 text-indigo-800"
  };

  const { refetch } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteBook(book._id).unwrap();
      await refetch();
      toast.success("Book deleted successfully");
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.error("Failed to delete book. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
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
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 w-full">
    
    <div className="flex items-center">
      <div className={`w-2 h-2 rounded-full mr-2 ${book.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className={`text-sm font-medium ${book.available ? 'text-green-700' : 'text-red-700'}`}>
        {book.available ? 'Available' : 'Checked Out'}
      </span>
    </div>

    <div className="flex flex-wrap gap-2 justify-end">
      <button
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          book.available
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!book.available}
      >
        {book.available ? <BorrowBook name={book.title} _id={book._id} /> : 'Unavailable'}
      </button>

      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          isDeleting 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>

      <Updatebook book={book} />
    </div>
  </div>
</CardFooter>

      </Card>

      <ConfirmationDialog
      
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Book"
        message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
      />
    </>
  );
};

export default BookCard;