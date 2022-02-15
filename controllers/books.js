import fs from 'fs';

export const getBooks = (req, res) => {
  const searchQuery = req.query?.search;
  const bookId = req.query?.bookId;

  fs.readFile(
    new URL('../books/aqidah.json', import.meta.url),
    'utf8',
    (err, data) => {
      let response = JSON.parse(data);
      if (bookId) {
        response = response.find((item) => item.id === bookId);
      }
      if (searchQuery) {
        response = response.content.filter(({ text }) =>
          text.includes(searchQuery)
        );
      }
      res.end(JSON.stringify(response));
    }
  );
};

export const getCategories = (req, res) => {
  const fileNames = [];
  fs.readdir(new URL('../books/', import.meta.url), (err, files) => {
    files.forEach((file) => {
      fileNames.push({ category: file.replace('.json', '') });
    });
    res.end(JSON.stringify(fileNames));
  });
};

export const getCategoryBooks = (req, res) => {
  const { category } = req.params;

  fs.readFile(
    new URL(`../books/${category}.json`, import.meta.url),
    'utf8',
    (err, data) => {
      res.end(data);
    }
  );
};

// export const getSpecificContent = (req, res) => {
//   fs.readFile(
//     new URL('../books/al-quran-dan-tafsir.json', import.meta.url),
//     'utf8',
//     (err, data) => {
//       const books = JSON.parse(data);
//       const { content } = books.find((book) => book.id === req.params.id);
//       const currentPage = content.find((book) => book.page == req.params.page);
//       if (currentPage) {
//         res.end(JSON.stringify(currentPage));
//       } else {
//         res.end(
//           JSON.stringify({
//             message: 'Maaf, halaman yang anda cari tidak ada pada buku ini.',
//           })
//         );
//       }
//     }
//   );
// };
