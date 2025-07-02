import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useBorrowBookMutation, useGetBooksQuery } from '@/redux/api/baseapi';

const BorrowBook = ({ _id,  name  }) => {
  const [open, setOpen] = useState(false);
  const [createBorrow] = useBorrowBookMutation();

  const [formData, setFormData] = useState({
    book: _id,
    quantity: 1,
    dueDate: ''
  });

  const {refetch} = useGetBooksQuery(undefined)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createBorrow({ ...formData }).unwrap();
      toast.success("Book borrowed successfully");
      console.log("Borrowed:", res);
      refetch()
      setFormData({ book: _id, quantity: 1, dueDate: '' }); 
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to borrow book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Borrow Book</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow a Book</DialogTitle>
          <DialogDescription>You can set quantity and due date only.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label>Book Name</Label>
            <Input value={name} readOnly className="cursor-not-allowed  opacity-70" />
          </div>
          
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min={1}
            />
          </div>
          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBook;
