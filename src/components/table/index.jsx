const Table = ({ cabeçalho, list }) => {

    return (
        <>
            <div className='w-1/5 border rounded-md overflow-hidden'>
                <table className='w-full'>
                    <thead className='bg-primary text-secundary'>
                        <tr>
                            <th className='py-1'>{cabeçalho}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => {
                            return (
                                <tr>
                                    <td className='py-0.5 pl-4'>{item}</td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;