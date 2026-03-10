// DATA — N3 第1週 (Soumatome N3 Bunpou)
// 18 pola grammar · Week 1 · がんばらなくちゃ！

const N3_W1 = [
// ── 第1週 1日目 ── Passive & Causative
  {id:'n3-w1d1-01', level:'n3', week:1, day:1, cat:'passive',
   grammar:'〜られている', reading:'〜rarete iru',
   meaning:'Ditulis / dilakukan (pasif — menyatakan fakta umum tanpa subjek)',
   connection:'V受身形＋ている',
   desc:'Menyatakan fakta atau keadaan <strong>tanpa menyebut pelakunya</strong>. Subjek kalimat adalah penerima aksi. Sering dipakai saat menyampaikan fakta umum atau informasi resmi.',
   nuance:'Dipakai ketika subjek tidak perlu disebutkan atau tidak diketahui. Konteks: pengumuman, berita, penjelasan fakta.',
   examples:[
     {jp:'この本には、くわしい説明は<b>書かれていません</b>。', id:'Dalam buku ini tidak ada penjelasan rinci.'},
     {jp:'入学式は、このホールで<b>行われます</b>。', id:'Upacara masuk sekolah akan dilaksanakan di aula ini.'},
     {jp:'これは、世界でいちばん大きいダイヤモンドだと<b>言われています</b>。', id:'Berlian ini dikatakan sebagai yang terbesar di dunia.'},
     {jp:'昔は、その考えが正しいと<b>思われていた</b>。', id:'Dulu, pemikiran itu dianggap benar.'}
   ]},

  {id:'n3-w1d1-02', level:'n3', week:1, day:1, cat:'passive',
   grammar:'〜に〜られた', reading:'〜ni〜rareta',
   meaning:'Kena... oleh... (pasif — akibat yang menyusahkan)',
   connection:'NにVられる',
   desc:'Menyatakan bahwa subjek <strong>mengalami situasi sulit atau tidak menyenangkan</strong> akibat tindakan orang/hal lain. Ada nuansa pembicara merasa <em>terdampak negatif</em>.',
   nuance:'Berbeda dengan pasif biasa — di sini ada rasa rugi atau terpaksa. Sering diikuti 〜てしまった untuk memperkuat nuansa menyesal.',
   examples:[
     {jp:'友達の赤ちゃんを抱っこしたら、<b>泣かれて</b>しまった。', id:'Waktu aku gendong bayi temanku, malah nangis.'},
     {jp:'雨に<b>降られて</b>、服がぬれてしまった。', id:'Kena hujan, bajunya jadi basah.'},
     {jp:'父に<b>死なれて</b>、大学を続けられなくなりました。', id:'Ditinggal mati ayah, jadi tidak bisa melanjutkan kuliah.'}
   ]},

  {id:'n3-w1d1-03', level:'n3', week:1, day:1, cat:'causative',
   grammar:'〜させてください', reading:'〜sasete kudasai',
   meaning:'Tolong izinkan saya... / Bolehkah saya...?',
   connection:'V(さ)せて＋ください／もらえますか／もらえませんか',
   desc:'Digunakan untuk <strong>meminta izin kepada orang lain</strong> agar pembicara bisa melakukan sesuatu. Menggunakan bentuk kausatif (させる) sebagai tanda memohon persetujuan.',
   nuance:'Lebih sopan dari 〜てもいいですか. Ekspresi untuk meminta izin melakukan tindakan sendiri, bukan menyuruh orang lain.',
   examples:[
     {jp:'ちょっと気分が悪いので、早く帰ら<b>せてください</b>。', id:'Saya agak tidak enak badan, bolehkah saya pulang lebih awal?'},
     {jp:'あなたの会社のお話を聞か<b>せてください</b>。', id:'Bolehkah saya mendengar cerita tentang perusahaan Anda?'},
     {jp:'手を洗わ<b>せてください</b>。', id:'Bolehkah saya mencuci tangan?'}
   ]},

  // ── 第1週 2日目 ── Bentuk Kasual
  {id:'n3-w1d2-01', level:'n3', week:1, day:2, cat:'keharusan',
   grammar:'〜ないと／〜なくちゃ', reading:'〜naito / 〜nakucha',
   meaning:'Harus... (kalau tidak...)',
   connection:'Vないと／Vなくちゃ',
   desc:'Bentuk percakapan dipersingkat dari <strong>「Vなければならない」</strong>. Menyatakan keharusan. Kalimat sering berakhir tanpa melanjutkan konsekuensinya karena sudah dipahami.',
   nuance:'〜ないと dan 〜なくちゃ bermakna sama, keduanya sangat kasual. Versi formal: 〜なければなりません.',
   examples:[
     {jp:'明日は早く出かけるから、もう寝<b>ないと</b>。', id:'Besok harus berangkat pagi, jadi harus tidur sekarang.'},
     {jp:'試験まであと1ヵ月だ。がんばって勉強し<b>ないと</b>。', id:'Tinggal sebulan lagi ujian. Harus giat belajar.'},
     {jp:'田中さんにメールの返信をし<b>なくちゃ</b>。', id:'Harus balas email Tanaka-san.'}
   ]},

  {id:'n3-w1d2-02', level:'n3', week:1, day:2, cat:'kasual',
   grammar:'〜ちゃった／〜ちゃう', reading:'〜chatta / 〜chau',
   meaning:'Sudah... (tidak sengaja / menyesal) — bentuk kasual dari 〜てしまった',
   connection:'V（て形）しまった → ちゃった／じゃった',
   desc:'Bentuk percakapan dari <strong>「〜てしまう／〜てしまった」</strong>. Menyatakan sesuatu terjadi <em>tidak sengaja</em> atau ada nuansa <em>menyesal</em>.',
   nuance:'Perubahan: 〜てしまう→〜ちゃう、〜でしまう→〜じゃう。Contoh: 来てしまう→来ちゃう、帰ってしまう→帰っちゃう、死んでしまう→死んじゃう.',
   examples:[
     {jp:'「あれ？ここにあったチョコレートは？」「あ、食べ<b>ちゃった</b>。いけなかった？」', id:'"Lho, cokelatnya ke mana?" "Ah, sudah kumakan. Tidak boleh ya?"'},
     {jp:'試験が終わった！今日は飲ん<b>じゃおう</b>！', id:'Ujian sudah selesai! Hari ini minum-minum sajalah!'},
     {jp:'もしもし、すみません。車が混ん<b>じゃって</b>……少し遅れます。', id:'Halo, maaf. Macet... sedikit terlambat.'}
   ]},

  {id:'n3-w1d2-03', level:'n3', week:1, day:2, cat:'kasual',
   grammar:'〜とく／〜といて', reading:'〜toku / 〜toite',
   meaning:'Melakukan/menyiapkan terlebih dahulu — bentuk kasual dari 〜ておく',
   connection:'Vておく → Vとく／Vとかない／Vといて',
   desc:'Bentuk percakapan dari <strong>「〜ておく」</strong>. Menyatakan melakukan sesuatu <em>sebagai persiapan</em> atau <em>meninggalkan sesuatu dalam keadaan tertentu</em>.',
   nuance:'Perubahan: しておきます→しときます、見ておいた→見といた、読んでおきます→読んどきます、飲んでおいて→飲んどいて.',
   examples:[
     {jp:'テストで間違ったところを、ノートに書い<b>とこう</b>。', id:'Yang salah di tes, aku tulis dulu di buku catatan.'},
     {jp:'これ洗濯し<b>といて</b>。', id:'Tolong cucikan ini dulu.'},
     {jp:'トイレットペーパーがもうすぐなくなるから、買っ<b>とかないと</b>。', id:'Tisu toilet mau habis, harus beli dulu.'}
   ]},

  // ── 第1週 3日目 ── Ekspresi Kemiripan
  {id:'n3-w1d3-01', level:'n3', week:1, day:3, cat:'inferensi',
   grammar:'〜みたいだ', reading:'〜mitai da',
   meaning:'Sepertinya... / Kayaknya... (kasual, dari pengamatan/perkiraan)',
   connection:'N／V普通形／Aい／na語幹＋みたいだ',
   desc:'Menyatakan <strong>perkiraan atau inferensi</strong> berdasarkan pengamatan langsung. Lebih kasual dari 〜ようだ. Bisa juga berarti "menyerupai" saat mendeskripsikan bentuk atau sifat.',
   nuance:'Bentuk: みたいだ (predikat), みたいに (adverb), みたいな (adj. sebelum nomina). Lebih percakapan dibanding 〜ようだ.',
   examples:[
     {jp:'彼の話し方は、女<b>みたいだ</b>。', id:'Cara bicaranya seperti perempuan.'},
     {jp:'ここの砂は星<b>みたいな</b>形をしている。', id:'Pasir di sini berbentuk seperti bintang.'},
     {jp:'このアパートはだれも住んでいない<b>みたいだ</b>。', id:'Apartemen ini sepertinya tidak ada yang tinggal.'},
     {jp:'明日は雨<b>みたいね</b>。', id:'Kayaknya besok hujan ya.'}
   ]},

  {id:'n3-w1d3-02', level:'n3', week:1, day:3, cat:'ekspresi',
   grammar:'〜らしい', reading:'〜rashii',
   meaning:'Khas... / Benar-benar seperti... (menunjukkan sifat sejati)',
   connection:'Nらしい',
   desc:'Menempel pada nomina, menyatakan bahwa sesuatu <strong>memiliki sifat atau ciri khas yang sesungguhnya</strong> dari nomina tersebut. Bukan sekedar kemiripan, melainkan benar-benar merepresentasikan kategorinya.',
   nuance:'Ini adalah 接尾語 (sufiks), berbeda dari 〜らしい inferensi. Contoh umum: 子どもらしい、男らしい/女らしい、私らしい/君らしい.',
   examples:[
     {jp:'今日は、春<b>らしい</b>暖かい日でした。', id:'Hari ini cuacanya hangat dan benar-benar terasa seperti musim semi.'},
     {jp:'私は女性<b>らしい</b>洋服はあまり着ない。', id:'Saya jarang memakai pakaian yang benar-benar feminin.'}
   ]},

  {id:'n3-w1d3-03', level:'n3', week:1, day:3, cat:'ekspresi',
   grammar:'〜っぽい', reading:'〜ppoi',
   meaning:'-ish / Terkesan seperti... / Cenderung... (sering bernuansa negatif)',
   connection:'Nっぽい',
   desc:'Menempel pada nomina, menyatakan bahwa sesuatu <strong>cenderung atau terkesan seperti</strong> nomina tersebut. Sering membawa nuansa <em>negatif atau meremehkan</em>.',
   nuance:'Contoh umum: 子どもっぽい(−)、男っぽい/女っぽい、黒っぽい/白っぽい、水っぽい(−). NG: むりっぽい、いいっぽい.',
   examples:[
     {jp:'あの小学生は、大人<b>っぽい</b>。', id:'Murid SD itu terkesan seperti orang dewasa.'},
     {jp:'この料理は油<b>っぽくて</b>いやだ。', id:'Masakan ini terasa berminyak dan tidak enak.'}
   ]},

  // ── 第1週 4日目 ── Varian ように (aksi)
  {id:'n3-w1d4-01', level:'n3', week:1, day:4, cat:'kebiasaan',
   grammar:'〜ようにする', reading:'〜you ni suru',
   meaning:'Berusaha untuk... / Menjadikan kebiasaan untuk...',
   connection:'Vる／Vない＋ようにする',
   desc:'Menyatakan <strong>usaha atau niat aktif</strong> pembicara untuk membiasakan diri melakukan (atau tidak melakukan) sesuatu.',
   nuance:'Menekankan proses atau kebiasaan yang sedang dibangun. Berbeda dengan 〜ようになる yang menekankan perubahan yang sudah terjadi.',
   examples:[
     {jp:'忘れ物をしないように<b>しましょう</b>。', id:'Mari berusaha agar tidak ada barang yang ketinggalan.'},
     {jp:'毎食後、歯をみがく<b>ようにしています</b>。', id:'Saya berusaha menyikat gigi setiap selesai makan.'}
   ]},

  {id:'n3-w1d4-02', level:'n3', week:1, day:4, cat:'tujuan',
   grammar:'〜ように（目的）', reading:'〜you ni (mokuteki)',
   meaning:'Agar... / Supaya... (menyatakan tujuan)',
   connection:'Vる／Vない／Vれる＋ように',
   desc:'Digunakan sebelum kata kerja aksi untuk menyatakan <strong>tujuan atau arah dari tindakan tersebut</strong>.',
   nuance:'Berbeda dengan 〜ために (tujuan langsung/aktif). 〜ように dipakai saat klausa tujuan berisi kata kerja intransitif, potential, atau negatif.',
   examples:[
     {jp:'みんなに聞こえる<b>ように</b>もっと大きな声で話してください。', id:'Tolong bicara lebih keras supaya semua orang bisa mendengar.'},
     {jp:'忘れない<b>ように</b>、手帳に書いておこう。', id:'Supaya tidak lupa, aku tulis di buku agenda dulu.'}
   ]},

  {id:'n3-w1d4-03', level:'n3', week:1, day:4, cat:'perubahan',
   grammar:'〜ようになる', reading:'〜you ni naru',
   meaning:'Jadi bisa... / Menjadi... (perubahan keadaan)',
   connection:'Vるようになる',
   desc:'Menyatakan bahwa <strong>kemampuan atau kebiasaan berubah</strong> dari kondisi sebelumnya menjadi kondisi baru. Menekankan hasil perubahan yang sudah terjadi.',
   nuance:'Berbeda dari 〜ようにする yang menekankan usaha yang sedang berlangsung. 〜ようになる = sudah berubah.',
   examples:[
     {jp:'直してもらったから、使える<b>ようになった</b>よ。', id:'Karena sudah diperbaiki, jadi bisa dipakai lagi.'},
     {jp:'ここの電気は人が通るとつく<b>ようになっています</b>。', id:'Lampu di sini sudah diatur agar menyala kalau ada orang yang lewat.'}
   ]},

  // ── 第1週 5日目 ── Varian ように (konteks)
  {id:'n3-w1d5-01', level:'n3', week:1, day:5, cat:'ekspresi',
   grammar:'〜のように／〜（V）ように（説明の前置き）', reading:'〜no you ni',
   meaning:'Seperti yang... / Sebagaimana... (pembuka penjelasan)',
   connection:'Nの／V普通形＋ように',
   desc:'Digunakan <strong>di awal kalimat sebagai pembuka penjelasan</strong>, merujuk pada informasi yang sudah diketahui bersama atau pernah disampaikan sebelumnya.',
   nuance:'Sering dipakai dalam situasi formal atau pengumuman. Frasa umum: 図のように、前にお話したように、田中さんが言ったように、皆様ご存じのように.',
   examples:[
     {jp:'皆様ご存じの<b>ように</b>、試験の内容が変わります。', id:'Sebagaimana sudah diketahui oleh semua, isi ujian akan berubah.'},
     {jp:'ここに書いてある<b>ように</b>、今度の木曜日、授業は午前中だけです。', id:'Seperti yang tertulis di sini, Kamis ini kelas hanya sampai siang.'},
     {jp:'前にお話した<b>ように</b>、来年から授業料が値上がりします。', id:'Seperti yang sudah saya sampaikan, mulai tahun depan biaya kuliah naik.'}
   ]},

  {id:'n3-w1d5-02', level:'n3', week:1, day:5, cat:'permintaan',
   grammar:'〜ように（依頼・命令）', reading:'〜you ni (irai)',
   meaning:'Tolong... / Mohon... (permintaan halus)',
   connection:'Vる／Vない＋ように',
   desc:'Digunakan untuk menyampaikan <strong>permintaan atau instruksi yang halus</strong>. Lebih lembut dari 〜てください. Sering dipakai guru, atasan, atau dalam pengumuman.',
   nuance:'Juga bisa dipakai untuk meneruskan perintah dari orang lain (indirect command). Contoh turunan: するようにしましょう、するようにしなさい.',
   examples:[
     {jp:'「明日はもっと早く来る<b>ように</b>。」「わかりました。」', id:'"Besok tolong datang lebih awal." "Baik."'},
     {jp:'ここで、たばこを吸わない<b>ように</b>。', id:'Mohon tidak merokok di sini.'}
   ]},

  {id:'n3-w1d5-03', level:'n3', week:1, day:5, cat:'harapan',
   grammar:'〜ますように／〜ませんように', reading:'〜masu you ni / 〜masen you ni',
   meaning:'Semoga... / Mudah-mudahan...',
   connection:'Vます／Vません／Vれます＋ように',
   desc:'Menyatakan <strong>harapan atau doa</strong> pembicara agar sesuatu terjadi atau tidak terjadi. Seperti doa yang ditujukan ke luar kendali pembicara.',
   nuance:'Berbeda dengan 〜たい (keinginan diri sendiri). 〜ますように adalah harapan/doa ke luar. Contoh: 勝ちますように、合格しますように、負けませんように.',
   examples:[
     {jp:'合格し<b>ますように</b>。', id:'Semoga lulus.'},
     {jp:'母の病気が治り<b>ますように</b>。', id:'Semoga penyakit ibu sembuh.'},
     {jp:'インフルエンザにかかり<b>ませんように</b>。', id:'Semoga tidak kena flu.'}
   ]},

  // ── 第1週 6日目 ── Volitional ようとする
  {id:'n3-w1d6-01', level:'n3', week:1, day:6, cat:'niat',
   grammar:'〜（よ）うと思う', reading:'〜(yo)u to omou',
   meaning:'Berniat untuk... / Sedang berpikir untuk...',
   connection:'V意向形＋と思う',
   desc:'Menyatakan <strong>niat atau rencana pembicara</strong> untuk melakukan sesuatu. Menggunakan bentuk volitional (意向形) + と思う.',
   nuance:'〜ようと思っている menekankan niat yang sedang dipertimbangkan. Mirip 〜つもりです tapi lebih menekankan keputusan dari dalam diri.',
   examples:[
     {jp:'会社を<b>やめようと思っている</b>。', id:'Sedang berpikir untuk berhenti kerja.'},
     {jp:'来年、国に帰ろう<b>と思っています</b>。', id:'Saya berencana pulang ke negara asal tahun depan.'}
   ]},

  {id:'n3-w1d6-02', level:'n3', week:1, day:6, cat:'niat',
   grammar:'〜（よ）うとする', reading:'〜(yo)u to suru',
   meaning:'Hendak... / Tepat saat akan... (momen sesaat sebelum aksi)',
   connection:'V意向形＋とする',
   desc:'Menyatakan bahwa <strong>subjek sedang dalam momen sesaat sebelum melakukan aksi</strong>. Menggambarkan titik transisi antara sebelum dan sesudah aksi.',
   nuance:'Menekankan "tepat saat akan melakukan" sesuatu. Lebih spesifik dari 〜ようと思う yang lebih longgar dari segi waktu.',
   examples:[
     {jp:'電車に乗ろう<b>としたときに</b>、ドアが閉まって乗れなかった。', id:'Tepat saat hendak naik kereta, pintunya menutup dan tidak bisa naik.'},
     {jp:'あ、ポチが、あなたの靴をかもう<b>としているよ</b>。', id:'Eh, Pochi mau menggigit sepatumu tuh.'},
     {jp:'ポチは、ぼくが出かけ<b>ようとすると</b>、ほえる。', id:'Setiap kali aku hendak keluar, Pochi menggonggong.'}
   ]},

  {id:'n3-w1d6-03', level:'n3', week:1, day:6, cat:'niat',
   grammar:'〜（よ）うとしない', reading:'〜(yo)u to shinai',
   meaning:'Tidak mau... / Tidak ada niat untuk... (tidak menunjukkan kemauan)',
   connection:'V意向形＋としない',
   desc:'Menyatakan bahwa <strong>subjek sama sekali tidak menunjukkan niat atau kemauan</strong> untuk melakukan sesuatu. Ada nuansa kritik atau keheranan dari pembicara.',
   nuance:'Berbeda dari 〜ない (sekadar tidak melakukan). 〜ようとしない menekankan tidak ada kemauan sama sekali, padahal bisa.',
   examples:[
     {jp:'「ポチ、どうしたんだろう。ご飯を食べ<b>ようとしない</b>んだよ。」', id:'"Pochi kenapa ya? Tidak mau makan sama sekali."'},
     {jp:'彼は、自分のことは何も言おう<b>としない</b>。', id:'Dia sama sekali tidak mau bicara tentang dirinya sendiri.'}
   ]},
];

