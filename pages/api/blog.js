export default function Blog(req, res) {
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
        /*{
      id: 2,
      title: "My Favorite Book of All Time",
      date: "1/18/2023",
      author: "Phillip Nguyen",
      imgURL: "/images/AtomicHabits.jpg",
      content:
        "tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa",
    },
    */
        {
          id: 2,
          title: "My Favorite Songs on Spotify",
          date: "02/08/2023",
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
          content:
            "<p>January 22, 2023 @ Lincoln, NE</p><p>I am sitting here, writing how I felt about this 8th Tet holiday in Nebraska, and how I missed being home, in which at those times, I loved helping my parents prepare for a Vietnamese New Year’s meal back in Vietnam.</p><p>Tet holiday, or Lunar New Year, came sooner than most years in the past. Even I couldn’t believe how fast a new year was coming and how I thought about my 2022. It was a difficult year for most people, because of the global economy’s hardship (and seems to be worse in 2023, so watch out). For me, I can say that 2022 was a success in both academics and work. Especially, my biggest wish for 2022 was accomplished – getting an internship for 2023. I’ve got to shout out to my family, friends, and my girlfriend for being such supportive phenomena for those achievements last year.</p><p>Now, for the Lunar New Year 2023, I imagined it would feel the same from the past 7 years, since I got to taste the traditional food for this event every year: bánh chưng, nem, phồng tôm, canh sườn măng , etc. Not this year though. I was lucky to meet new people from my girlfriend’s relatives and friends. They brought such fun and energetic environment, which was almost exactly what I remembered from my childhood’s experience. Plus, one of the most important traditions, li xi, was brought into the party. I was lucky enough to get one even though I was not supposed to get it in my age haha! Anyway, hopefully this lucky money brings me luck this year. </p><img src=” https://i.imgur.com/ppowji3.jpg” alt=”tet2023” style={{textAlign: “center”}}/><p>However, even all of these, I still missed Tet in Vietnam. It is just so unique that nowhere in the world can replicate the authentic atmosphere when everyone buys peach branch before the New Year’s Eve, cleans up the whole house to “invite their ancestors” to enjoy the food with the family, or goes to each other’s home to wish a Happy New Year. In the future, I hope I have some time to go back to completely enjoy Tet in Vietnam once again. </p>",
          bgPos: "right",
        },
      ],
    },
    {
      type: "interview",
      blogs: [],
    },
  ]);
}
