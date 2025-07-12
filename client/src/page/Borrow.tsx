import { useGetborrowBookQuery } from '@/redux/api/baseapi';
import type {   IBorrowSumm } from '@/types/types';

const Borrow = () => {
  const { data, isLoading, isError } = useGetborrowBookQuery(undefined);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load borrow summary.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center"> Borrowed Book Summary</h2>

      {data?.data?.length === 0 ? (
        <div className="text-center text-gray-500">No borrowed books found.</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">ISBN</th>
                <th className="px-4 py-3 border-b">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((entry : IBorrowSumm, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{entry.book.title}</td>
                  <td className="px-4 py-2 border-b">{entry.book.isbn}</td>
                  <td className="px-4 py-2 border-b">{entry.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Borrow;
