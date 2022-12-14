const { nanoid } = require('nanoid');
const books = require('./books');


const addBooks = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    const id = nanoid(16);

    const finished = false;
    if(readPage===pageCount)
    {
        finished = true;
    }

    const insertedAt = newDate().toISOString();
    const updateAt = insertedAt;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updateAt,
    };

    books.push(newBook);

    if(name === null){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if(readPage > pageCount)
    {
        const response = h.response({
            status: 'error',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
        status:'success',
        message:'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status:'fail',
        message:'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

module.exports = {addBooks};