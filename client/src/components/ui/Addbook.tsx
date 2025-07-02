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
import { useCreateBooksMutation, useGetBooksQuery } from "@/redux/api/baseapi";
import { toast } from "sonner";

const Addbook = () => {
		 const  {refetch}= useGetBooksQuery(undefined)
	
	const [createTask, { data, isError, isLoading }] = useCreateBooksMutation();
	const [formData, setFormData] = useState({
  title: '',
  author: '',
  genre: '',
  isbn: '',
  description: '',
  copies: 1,
  available: true, 
});

	const [open, setOpen] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: name === "copies" ? Number(value) : value,
		}));
	};

	const handleGenreChange = (value: string) => {
		setFormData((prev) => ({ ...prev, genre: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitted Book:", formData);

		const res = await createTask(formData).unwrap();
        toast("Book added successfully!")

		refetch()

		setOpen(false);
		setFormData({
			title: "",
			author: "",
			genre: "",
			isbn: "",
			description: "",
			copies: 1,
            available: true,
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add New Book</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Add a New Book</DialogTitle>
					<DialogDescription>
						Fill in the details below to add a book.
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
						<Select onValueChange={handleGenreChange}>
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
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									available: e.target.checked,
								}))
							}
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
							min={1}
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

export default Addbook;
