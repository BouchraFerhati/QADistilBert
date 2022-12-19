# Question Answering

## Deskripsi Aplikasi [QA-U2U]

Aplikasi QA-U2U merupakan aplikasi question answering yang dapat membantu menjawab pertanyaan yang ada pada teks yang telah diinputkan. Aplikasi ini dibangun menggunakan model Machine Learning Distill Bert. 


## Cara Menjalankan Aplikasi
Berikut langkah-langkah untuk menjalankan aplikasi: 

1. Unduh file python model.py
2. Install library yang diperlukan
3. Run source code dengan command streamlit run model.py

![image_2022-12-15_13-55-28](https://user-images.githubusercontent.com/95232955/208300286-4b0a1df1-0f5c-4a9c-a3d5-031474d6541d.png)

Gambar di atas merupakan tampilan aplikasi QA-U2U. Untuk menjalankannya, pertama kali user harus menginputkan context ataupun article yang digunakan sebagai sumber jawaban dari pertanyaan yang akan diajukan. Setelah itu user menginputkan pertanyaan yang akan diajukan. Lalu klik tombol "Answer", maka aplikasi akan otomatis memberikan jawaban dari pertanyaan sesuai dengan context ataupun article yang diinputkan.


## Proses


### Dataset

Dataset yang digunakan adalah dataset SQUAD (The Stanford Question Answering Dataset) dimana isinya berupa kumpulan pasangan tanya jawab yang berasal dari artikel Wikipedia. Di SQuAD, jawaban pertanyaan yang benar dapat berupa urutan token apapun dalam teks yang diberikan.



### Preprocessing

Sebelum teks dimasukan pada model, maka dilakukan preprocessing terlebih dahulu dengan Tokenizer,  dimana tokenizer ini nanti akan mentokenisasi input dan akan menempatkannya pada format yang di expect oleh model kita. Dibuat instance untuk tokenizernya dengan AutoTokenizer untuk memastikan bahwa tokenizernya sesuai dengan model yang dipakai dan sudah download vocab yang dipakai saat pretrain. Apabila terdapat dokumen terlalu panjang, dilakukan Truncate dokumen, bila letak jawaban tepat di bagian yang ditruncate, maka kita allow overlap diantara 2 fitur yang dikontrol oleh doc_stride. Kemudian, ditambahkan metode sequence_ids dari tokenized_example dimana ini dapat berguna untuk membedakan bagian mana yang sesuai dengan pertanyaan dan bagian mana yang sesuai dengan konteksnya. Agar bisa bekerja pada model manapun, kita harus jaga jaga bahwa akan ada padding di kiri dimana akibatnya ini bisa switch urutan question dan context. Trakhir, menambahkan metode map agar fungsi ini bisa digunakan di semua kalimat.


### Training

Setelah data siap untuk ditraining, kita dapat mengunduh model pre-trained dan mengaplikasiakan fine-tune pada model tersebut. Untuk training digunakan class Trainer dari transformers dan ntuk menginstansiasi Trainer, kita perlu mendefinisikan tiga hal lagi, yaitu yang terpenting adalah TrainingArguments, yaitu kelas yang berisi semua atribut untuk menyesuaikan pelatihan. Ini membutuhkan satu nama folder, yang akan digunakan untuk menyimpan pos pemeriksaan model.
Selain itu disini juga kita menetapkan evaluasi akan dilakukan di akhir setiap epoch, menetapkan learning rate, penggunaan batch size yg sudah ditentukan, dan penentuan jumlah epoch. Setelah itu kita membutuhkan data colattor yang akan menggabungkan sampel yang sudah diproses, dan proses training dapat dimulai.

![image](https://user-images.githubusercontent.com/74850037/208308273-0ea68924-6bf6-4463-afb9-afa0bbe1ce20.png)

### Evaluasi
  Ketika mengevaluasi model, memerlukan lebih banyak word karena perlu memetakka prediksi model untuk kembali ke konteks. Model tersebut mempredikasi posisi jawaban awal dan akhir. Output dari model yaitu loss, logits awal dan akhir. Disinis kami tidak membutuhkan loss. 
  Terdapat satu logits untuk setiap fitur dan setiap token. Untuk memprediksi jawaban pada setiap fitur dilakukan dengan mengambil indeks maksimum logits awal sebagai posisi awal dan indeks maksimum logits akhir sebagai posisi akhir
  Untuk mengklasifikasikan jawaban, menggunakan skor yang diperoleh dengan menambahkan logits awal dan akhir. Indeks terbaik di logits awal dan akhir akan dipilih dan mengumpulkan semua jawaban yang diprediksi. Setelah itu, semua jawaban akan diurutkan berdasarkan skornya
  Untuk mempredikasi impossible answer ketika skornya lebih besar dari best non-impossible answer sehingga memberikan post-processing function kita bisa membuat load matric dari datasets library
