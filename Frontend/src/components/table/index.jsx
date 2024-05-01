const Table = ({ data }) => {

    return (
        <>
            <div className='border w-full md:w-auto rounded-md overflow-auto'>
                <table className='w-full table-auto'>
                    <thead className='bg-primary text-secundary w-full'>
                        <tr className="bg-primary">
                            {Object.keys(data[0]).map((dado, index) => {
                                return <th className="px-5 py-3" key={index}>{dado}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody className="">
                        {data.map((dado, index) => {
                            return <tr key={index}>{Object.values(dado).map((valor, index) => {
                                return <td className="py-2 px-5" key={index}>{valor}</td>
                            })}</tr>
                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;