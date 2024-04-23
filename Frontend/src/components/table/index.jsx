const Table = ({ data }) => {

    return (
        <>
            <div className='border rounded-md overflow-hidden'>
                <table className='w-full table-auto overflow-auto'>
                    <thead className='bg-primary text-secundary'>
                        <tr>
                            {Object.keys(data[0]).map((dado, index) => {
                                return <th className="px-2 py-3" key={index}>{dado}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dado, index) => {
                            return <tr>{Object.values(dado).map((valor, index) => {
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