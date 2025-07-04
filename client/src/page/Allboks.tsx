import Addbook from '@/components/ui/Addbook';
import Bookcard from '@/components/ui/Bookcard';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useGetBooksQuery } from '@/redux/api/baseapi';
import type { IBook } from '@/types/types';

const Allboks = () => {

    // const dispatch = useAppDispatch()

    // const books = useAppSelector((state) => state.book.books)
    // const books = useAppSelector((state) => state.book.books)

     const  {data , isLoading ,isError , refetch}= useGetBooksQuery(undefined)
 

    

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div>

            <h1 className='text-2xl font-medium text-center '>  All Books</h1>
            <Addbook onRefetch={refetch} />


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 '>

                {!isLoading &&
                    data.data.map((book : IBook)=>{
                        
                      return  <Bookcard book={book}></Bookcard>
                    } )
                }

            </div>
            
        </div>
    );
};


export default Allboks;