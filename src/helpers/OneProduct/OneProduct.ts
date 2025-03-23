import { Product } from '../../interfaces/product'
import img1 from './imgs/img1.jpg'
import img2 from './imgs/img2.jpg'
import img3 from './imgs/img3.jpg'

export const OneProduct: Product = {
  id: 1,
  img: [
    img1,
    img2,
    img3,
    img2,
    img3,
    img2,
    img3,
    img2,
    img3,
    img2,
    img3,
    img2,
    img3,
    img2,
    img3,
  ],
  price: 1000,
  productName: 'Blackberry',
  description: '2gb ram, 128 gb rom',
  fullDescription:
    'Свежайший аппарат телефонной коммункации, не побоюсь этого слова смартфон, который изменит вашу жизнь. С Blackberry вы забудете о лагах в пабге и бравл старсе и кайфанёте от 30 Гц обновлении новейшего ips экрана.',
  specifications: [
    { name: 'Процессор', value: 'Intel Core i7' },
    { name: 'Оперативная память', value: '16 ГБ' },
    { name: 'Экран', value: '6.6 дюймов, IPS' },
  ],
  reviews: [
    {
      id: 1,
      author: 'Alex',
      rating: 4,
      comment: 'Good phone',
      date: new Date('2025-05-15'),
    },
  ],
}
