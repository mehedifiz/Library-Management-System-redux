import { useState } from "react";
import { Button } from "./button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { Textarea } from "./textarea";
import {  useGetBooksQuery, useUpdateBookMutation } from "@/redux/api/baseapi";
import { toast } from "sonner";
import type { IBook } from "@/types/types";


const Updatebook =({ book }: { book: IBook }) => {
  const [updateBook] = useUpdateBookMutation();
           const  {refetch}= useGetBooksQuery(undefined)
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
	_id: book._id,
	title: book.title || '',
	author: book.author || '',
	genre: book.genre || '',
	isbn: book.isbn || '',
	description: book.description || '',
	copies: book.copies || 1,
	available: book.available ?? true,
  });
 
  const handleChange = (e : any) => {
	const { name, value, type, checked } = e.target;
	setFormData((prev) => ({
	  ...prev,
	  [name]: type === 'checkbox' ? checked : name === 'copies' ? Number(value) : value,
	}));
  };

  const handleGenreChange = ( value: string) => {
setFormData((prev) => ({ ...prev, genre: value as IBook['genre'] }));
  };

  const handleSubmit = async  (e: React.FormEvent) => {
	e.preventDefault();
	try {
	  await updateBook(formData).unwrap();
	  toast.success('Book updated successfully!');
      refetch()
	  setOpen(false);
	} catch (error) {
	  toast.error('Failed to update book!');
	}
  };

  return (
	<Dialog open={open} onOpenChange={setOpen}>
	  <DialogTrigger asChild>
		<Button className="px-2" onClick={() => setOpen(true)}>Update Book</Button>
	  </DialogTrigger>
	  <DialogContent className="max-w-md">
		<DialogHeader>
		  <DialogTitle>Update Book</DialogTitle>
		  <DialogDescription>
			Edit the details below to update the book.
		  </DialogDescription>
		</DialogHeader>
		<form onSubmit={handleSubmit} className="space-y-4">
		  <div>
			<Label>Title</Label>
			<Input
			  name="title"
			  value={formData.title}
			  onChange={handleChange}
			  required
			/>
		  </div>
		  <div>
			<Label>Author</Label>
			<Input
			  name="author"
			  value={formData.author}
			  onChange={handleChange}
			  required
			/>
		  </div>
		  <div>
			<Label>Genre</Label>
			<Select onValueChange={handleGenreChange} value={formData.genre}>
			  <SelectTrigger>
				<SelectValue placeholder="Select genre" />
			  </SelectTrigger>
			  <SelectContent>
				<SelectItem value="FICTION">Fiction</SelectItem>
				<SelectItem value="NON_FICTION">Non Fiction</SelectItem>
				<SelectItem value="SCIENCE">Science</SelectItem>
				<SelectItem value="HISTORY">History</SelectItem>
				<SelectItem value="BIOGRAPHY">Biography</SelectItem>
				<SelectItem value="FANTASY">Fantasy</SelectItem>
			  </SelectContent>
			</Select>
		  </div>
		  <div>
			<Label>ISBN</Label>
			<Input
			  name="isbn"
			  value={formData.isbn}
			  onChange={handleChange}
			  required
			/>
		  </div>
		  <div>
			<Label>Description</Label>
			<Textarea
			  name="description"
			  value={formData.description}
			  onChange={handleChange}
			/>
		  </div>
		  <div className="flex items-center space-x-2">
			<input
			  type="checkbox"
			  id="available"
			  name="available"
			  checked={formData.available}
			  onChange={handleChange}
			  className="h-4 w-4 border-gray-300 rounded"
			/>
			<Label htmlFor="available">Available</Label>
		  </div>
		  <div>
			<Label>Copies</Label>
			<Input
			  type="number"
			  name="copies"
			  value={formData.copies}
			  onChange={handleChange}
			  required
			  min={0}
			/>
		  </div>
		  <Button type="submit" className="w-full">
			Submit
		  </Button>
		</form>
	  </DialogContent>
	</Dialog>
  );
};

export default Updatebook;
