const { Post } = require('../models');

const postData = [
   {
      title: 'First Post by user 1',
      post_content:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet libero nec ex porta tempus. Curabitur hendrerit lacus vitae libero fermentum, nec viverra nibh ultrices. Duis porttitor, massa vitae iaculis blandit, sapien augue pellentesque enim, quis aliquam est metus eu justo. Nullam sodales et velit in lacinia',
      user_id: 1,
   },
   {
      title: 'Second POST by user 2',
      post_content:
         'Nulla laoreet ac nibh sit amet tristique. Sed in risus condimentum, commodo diam at, lacinia sem. Nulla eget sem ornare augue ornare commodo.',
      user_id: 2,
   },
   {
      title: 'Third Post by user 3 ',
      post_content:
         'Donec tempor, nunc ut auctor dignissim, nisi dui pulvinar enim, vitae gravida dui urna at urna. Maecenas metus est, venenatis in tincidunt nec, elementum ut nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa dui. Mauris ornare tincidunt pulvinar. Cras nec hendrerit sapien. Nulla finibus nisl cursus ipsum molestie, a lacinia tellus ultrices. Maecenas sed neque nec ex finibus pretium.',
      user_id: 3,
   },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
