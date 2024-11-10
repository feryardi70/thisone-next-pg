"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SliderPage() {
  const slidesData = [
    {
      imgSrc: "/img/wisata/Pantai-Farii.webp",
      title: "Rekomendasi Wisata Nias - Pantai Fari'i",
      text1:
        "Terletak di sebuah pulau kecil yang merupakan bagian dari wilayah Desa Himberua Na'a, Kecamatan Sirombi, Pantai Fari'i menjadi destinasi wisata favorit Nias. Pantai ini menawarkan pemandangan hamparan pasir luas yang indah dan pondok-pondok kecil dengan barisan pohon cemara.",
      text2: "Mengunjungi objek wisata di Kepulaian Nias satu ini, kamu juga bisa memancing di beberapa titik favorit warga sekitar. Pantai ini bisa dicapai dengan menyewa perahu nelayan atau berjalan kaki ketika air laut sedang surut.",
    },
    {
      imgSrc: "/img/wisata/pantai-tureloto.webp",
      title: "Rekomendasi Wisata Nias - Pantai Tureloto",
      text1:
        "Pantai Tureleto merupakan salah satu destinasi wisata terbaik Nias yang patut kamu kunjungi. Perairan di sekitar pantai ini memiliki kadar garam yang tinggi dan membuatnya diberi julukan Laut Mati versi Indonesia. Sama seperti Laut mati yang berada di Timur Tengah, berkat tingginya kadar garam tersebut, siapapun yang berenang di sini tidak akan tenggelam meskipun tanpa menggunakan pelampung",
      text2:
        "Tempat wisata di Kepulauan Nias ini menghadap langsung ke perairan Samudera Hindia dan memiliki pemandangan yang memukau berhias batu karang berwarna hitam. Daya tarik pantai Tureloto ini tak berhenti sampai situ saja karena perairan disekitar destinasi wisata Nias ini juga menawarkan keindahan panorama alam bawah laut yang menakjubkan.",
    },
    {
      imgSrc: "/img/wisata/pantai-gawu-soyo.jpg",
      title: "Rekomendasi Wisata Nias - Pantai Gawu Soyo",
      text1:
        "Pantai dengan pasir berwarna pink tak hanya bisa kamu temukan di Pulau Komodo, tapi juga di kawasan Kepulauan Nias. Tepatnya di Pantai Gawu Soyo yang terletak di desa Ombolota, Kabupaten Nias utara, kamu bisa menikmati alternatif wisata pantai berpasir pink di Pulau Sumatera.",
      text2:
        "Destinasi tempat wisata di Kepulauan Nias satu ini tergolong masih asri dan belum banyak fasilitas wisata karena belum terlalu terkenal. Konon menurut penduduk sekitar, pasir berwarna pink tersebut berasal dari pertumpahan darah di pantai di zaman dulu. Berkunjung ke sini, kamu juga bisa menjelajah kehidupan bawah air lautnya yang indah.",
    },
    {
      imgSrc: "/img/wisata/nias2.jpeg",
      title: "Rekomendasi Wisata Nias - Desa Bawomataluo",
      text1:
        "Bagi kamu yang tertarik ingin mempelajari kebudayaan masyarakat Nias, Desa Bawomataluo adalah destinasi wisata terbaik di Kepulauan Nias yang wajib dikunjungi. Desa ini berdiri di atas bukit, tepatnya sekitar 15 km dari daerah tujuan wisata populer para peselancar dunia, Teluk Dalam.",
      text2:
        "Desa Bawomataluo terdiri dari kumpulan rumah adat milik para penduduk yang posisinya saling berhadapan dengan jarak 4 meter. Di bagian tengah kompleks rumah adat tersebut, terdapat susunan batu yang sangat penting. Susunan batu yang berada di area terbuka itu merupakan pusat upacara-upacara adat dan kegiatan ritual seperti upacara Lompat Batu.",
    },
    {
      imgSrc: "/img/wisata/luaha-ndroi.jpg",
      title: "Rekomendasi Wisata Nias - Air Terjun Luaha Ndroi",
      text1:
        "Destinasi wisata terbaik Nias lain yang bisa kamu kunjungi adalah Air Terjun Luaha Ndroi. Terletak di Desa Dulolo, Kecamatan Alasa, wisata air terjun ini punya pemandangan yang indah. Kawasan sekitar Air Terjun Luaha Ndroi dihiasi pepohonan yang rindang dan masih sangat alami.",
      text2:
        "Air terjun ini terdiri dari beberapa tingkat dengan ketinggian jatuh air sekitar 4 meter dan lebar 6 meter. Selain itu, kolam alam tempat jatuhnya air memiliki kedalaman 50cm - 5 meter yang membuat objek wisata di Kepulauan Nias ini juga jadi tempat asik untuk berenang dan mandi.",
    },
    {
      imgSrc: "/img/wisata/pulau-hinako.jpg",
      title: "Rekomendasi Wisata Nias - Pulau Hinako",
      text1:
        "Sebagai pulau terbesar yang berada di gugusan Kepulauan Hinako di Nias Barat, Pulau Hinako menawarkan keindahan yang tak kalah jika dibandingkan objek wisata Kepulauan Nias lainnya. Keindahan biota laut Pulau Hinako sangat terkenal hingga mancanegara. Maka tak heran pulau ini kerap dikunjungi wisatawan dari mancanegara.",
      text2:
        "Karena berbatasan langsung dengan Samudera Hindia, pantai di Pulau Hinako memiliki ombak yang relatif besar sehingga cocok untuk berselancar. Tak hanya berselancar, kamu yang berkunjung ke destinasi wisata di Kepulauan Nias ini bisa melakukan beragam aktifitas seperti memancing, menyelam, dan snorkeling.",
    },
    {
      imgSrc: "/img/wisata/Museum-Pusaka-Nias.jpg",
      title: "Rekomendasi Wisata Nias - Museum Pusaka Nias",
      text1:
        "Selain berkunjung ke Desa Bawomataluo, kamu yang ingin mempelajari kebudayaan masyarakat nias juga wajib pergi ke Museum Pusaka Nias. Museum yang telah berdiri semenjak tahun 1972 ini menyimpan berbagai macam benda seni, budaya, dan sejarah masyarakat Nias.",
      text2:
        "Terdiri atas 4 paviliun, kamu dapat belajar sejarah masyarakat nias lewat sejumlah koleksi arkeologi, etnografi dan biologi. Tak hanya itu, di salah satu paviliunnya juga terdapat koleksi batu-batuan granit yang ditemukan di sekitar kawasan Nias..",
    },
    {
      imgSrc: "/img/wisata/pulau-asu.jpg",
      title: "Rekomendasi Wisata Nias - Pulau Asu",
      text1:
        "Melakukan 'island hoping' di Kepulauan Nias memang takkan ada habisnya. Salah satu pulau indah yang terkenal sebagai destinasi wisata terbaik di Kepulauan Nias adalah Pulau Asu. Saking populer dan indahnya, Pulau Asu kerap dijuluki sebagai 'The Paradise on Earth'",
      text2: "Tujuan wisata di Kepulauan Nias yang berada di Kecamatan Sirombu, Kabupaten Nias Barat ini terkenal akan keindahan alam bawah lautnya sehingga cocok dijadikan destinasi untukmu pecinta diving dan juga snorkeling.",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full">
      <Slides slides={slidesData} />
    </div>
  );
}

function Slides({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % totalSlides), 60000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const moveSlide = (direction) => {
    setCurrentSlide((prev) => (prev + direction + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="min-w-full h-full flex-shrink-0 relative" key={index}>
            <Image src={slide.imgSrc} alt={`Slide ${index + 1}`} width={1920} height={1080} className="object-cover w-[100vw] h-[100vh]" />
            <div className="absolute bottom-1 text-white bg-gray-900 bg-opacity-70 p-4">
              <h4 className="text-lg font-semibold">{slide.title}</h4>
              <p className="text-sm">{slide.text1}</p>
              <p className="text-sm">{slide.text2}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Left Button */}
        <div
          onMouseOver={() => setIsLeftVisible(true)}
          onMouseOut={() => setIsLeftVisible(false)}
          className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-2xl text-white bg-black bg-opacity-50 px-2 py-1 rounded hover:bg-opacity-70 ${!isLeftVisible ? "opacity-0" : "opacity-100"}`}
        >
          <button onClick={() => moveSlide(-1)}>&#10094;</button>
        </div>

        {/* Right Button */}
        <div
          onMouseOver={() => setIsRightVisible(true)}
          onMouseOut={() => setIsRightVisible(false)}
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl text-white bg-black bg-opacity-50 px-2 py-1 rounded hover:bg-opacity-70 ${!isRightVisible ? "opacity-0" : "opacity-100"}`}
        >
          <button onClick={() => moveSlide(1)}>&#10095;</button>
        </div>
      </div>
    </div>
  );
}
