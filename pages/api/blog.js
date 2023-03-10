export default function Blog(req, res) {
  // Blog API
  res.status(200).json([
    {
      type: "general",
      blogs: [
        {
          id: 1,
          title: "First time in Seattle",
          date: "1/18/2023",
          author: "Phillip Nguyen",
          imgURL: "/images/blog1.jpeg",
          content:
            "tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa",
          bgPos: "top",
        },
        {
          id: 2,
          title: "My Favorite Songs on Spotify",
          date: "02/28/2023",
          author: "Phillip Nguyen",
          imgURL: "/images/spotify.png",
          content: "",
          bgPos: "",
        },
        {
          id: 3,
          title: "How I Created the Earth using ThreeJS & NextJS",
          date: "1/28/2023",
          author: "Phillip Nguyen",
          imgURL: "/images/threejs.png",
          content: "",
          bgPos: "left",
        },
        {
          id: 4,
          title: "My Eighth Lunar New Year in the U.S.",
          date: "1/22/2023",
          author: "Phillip Nguyen",
          imgURL: "/images/tet2023/IMG_0209.jpeg",
          content: "",
          bgPos: "right",
        },
      ],
    },
    {
      type: "interview",
      blogs: [
        {
          id: 5,
          title: "Two Sum",
          date: "2/15/2023",
          imgURL:
            "https://miro.medium.com/max/1400/1*2x-CAwfeui5YM4148VxgRA.jpeg",
          author: "Phillip Nguyen",
          type: ["array", "hashing"],
        },
        {
          id: 6,
          title: "Valid Anagrams",
          date: "2/16/2023",
          imgURL: "https://i.ytimg.com/vi/51RUl4xe8AE/maxresdefault.jpg",
          author: "Phillip Nguyen",
          type: ["array", "hashing"],
        },
        {
          id: 7,
          title: "Contains Duplicate",
          date: "2/20/2023",
          imgURL: "/images/leetcode/containsduplicate.png",
          author: "Phillip Nguyen",
          type: ["array", "hashing"],
        },
        {
          id: 8,
          title: "Group Anagrams",
          date: "2/22/2023",
          imgURL:
            "https://miro.medium.com/max/1200/1*EsgoZCXJp7PlMetgT3vJVg.png",
          author: "Phillip Nguyen",
          type: ["array", "hashing"],
        },
        {
          id: 9,
          title: "Valid Palindrome",
          date: "3/10/2023",
          imgURL: "/images/leetcode/validpalindrome.png",
          author: "Phillip Nguyen",
          type: ["twopointers"],
        },
        {
          id: 10,
          title: "Valid Palindrome",
          date: "3/13/2023",
          imgURL: "/images/leetcode/twosumsorted.png",
          author: "Phillip Nguyen",
          type: ["twopointers"],
        },
      ],
    },
  ]);
}
