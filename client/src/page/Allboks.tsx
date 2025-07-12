import Addbook from '@/components/ui/Addbook';
import Bookcard from '@/components/ui/Bookcard';
import { useGetBooksQuery } from '@/redux/api/baseapi';
import type { IBook } from '@/types/types';
import { Loader } from 'lucide-react';

const Allboks = () => {

    // const dispatch = useAppDispatch()

    // const books = useAppSelector((state) => state.book.books)
    // const books = useAppSelector((state) => state.book.books)

     const  {data , isLoading  }= useGetBooksQuery(undefined)
 

    

    if (isLoading || !data) {
        return <Loader/>;
    }


    return (
        <div>

            <h1 className='text-2xl font-medium text-center '>  All Books</h1>
            <Addbook />

             <div className="mb-6">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Browse Our Collection
                          </h2>
                          <p className="text-gray-600">
                            Discover books across various genres and authors
                          </p>
                        </div>

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