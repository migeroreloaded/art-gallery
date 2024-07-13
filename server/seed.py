# seed.py
from datetime import datetime
from app import app, db
from models import User, Artist, Artwork, Exhibition, ArtworkExhibition, Favorite
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Add Users
        user1 = User(username='james', email='james@gmail.com', password=bcrypt.generate_password_hash('password1234').decode('utf-8'), role='artist')
        user2 = User(username='bob', email='bob@gmail.com', password=bcrypt.generate_password_hash('passrd5323').decode('utf-8'), role='art enthusiast')
        user3 = User(username='jake', email='jake@gmail.com', password=bcrypt.generate_password_hash('passrd1234').decode('utf-8'), role='artist')
        user4 = User(username='Grace', email='grace@gmail.com', password=bcrypt.generate_password_hash('assword5678').decode('utf-8'), role='art enthusiast')
        user5 = User(username='alice', email='alice@gmail.com', password=bcrypt.generate_password_hash('ssword1234').decode('utf-8'), role='artist')
        user6 = User(username='Ben', email='ben@gmail.com', password=bcrypt.generate_password_hash('passwod5678').decode('utf-8'), role='art enthusiast')
        user7 = User(username='Otieno', email='otieno@gmail.com', password=bcrypt.generate_password_hash('psword1234').decode('utf-8'), role='artist')
        user8 = User(username='Brain', email='brain@gmail.com', password=bcrypt.generate_password_hash('pasord5678').decode('utf-8'), role='art enthusiast')


        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.add(user4)
        db.session.add(user5)
        db.session.add(user6)
        db.session.add(user7)
        db.session.add(user8)
        db.session.commit()

        # Add Artists
        artist1 = Artist(name='Pablo Ruiz Picasso', biography='Pablo Ruiz Picasso[a][b] (25 October 1881 – 8 April 1973) was a Spanish painter, sculptor, printmaker, ceramicist, and theatre designer who spent most of his adult life in France. One of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture,[8][9] the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d Avignon (1907) and the anti-war painting Guernica (1937), a dramatic portrayal of the bombing of Guernica by German and Italian air forces during the Spanish Civil War.Picasso demonstrated extraordinary artistic talent in his early years, painting in a naturalistic manner through his childhood and adolescence. During the first decade of the 20th century, his style changed as he experimented with different theories, techniques, and ideas. After 1906, the Fauvist work of the older artist Henri Matisse motivated Picasso to explore more radical styles, beginning a fruitful rivalry between the two artists, who subsequently were often paired by critics as the leaders of modern art..', birthdate=datetime(1881, 5, 1), nationality='Spanish', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGEKd02e-UADD5nLoYdT0_lKmV_Cl24s2HWdQcg3CoPy6KAS-S')
        artist2 = Artist(name='Pierre-Auguste Renoir', biography='A passionate art enthusiast.', birthdate=datetime(1990, 8, 15), nationality='British', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjz-Dhtsg3RF45PpiOJUeOrbp944afSc_ltQ&s')
        artist3 = Artist(name='Jennifer Anne Saville', biography='Jennifer Anne Saville RA (born 7 May 1970)[1] is a contemporary British painter and an original member of the Young British Artists.[2] Saville works and lives in Oxford, England[3] and she is known for her large-scale painted depictions of nude women. Saville has been credited with originating a new and challenging method of painting the female nude and reinventing figure painting for contemporary art. Some paintings are of small dimensions, while other are of much larger scale.[4] Monumental subjects come from pathology textbooks that she has studied that informed her on injury to bruise, burns, and deformity.[5] John Gray commented: "As I see it, Jenny Saville s work expresses a parallel project of reclaiming the body from personality. Saville worked with many models who underwent cosmetic surgery to reshape a portion of their body. In doing that, she captures marks of personality for the flesh and together embraces how we can be the writers of our own lives', birthdate=datetime(1985, 5, 1), nationality='American', image='data:image/jpeg;base64,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')
        artist4 = Artist(name='Damien Hirst', biography='Damien Steven Hirst ( born 7 June 1965) is an English artist and art collector.[1] He is one of the Young British Artists (YBAs) who dominated the art scene in the UK during the 1990s.[2][3] He is reportedly the United Kingdom s richest living artist, with his wealth estimated at US$384 million in the 2020 Sunday Times Rich List.[4][5][6] During the 1990s his career was closely linked with the collector Charles Saatchi, but increasing frictions came to a head in 2003 and the relationship ended.', birthdate=datetime(1965, 8, 15), nationality='British', image='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqCGhYhGAUgeK8pOavujT9YLr25Kl1a7aAJqDYpLI1oyk2CRt9')
        artist5 = Artist(name='Cynthia Morris Sherman', biography='Cynthia Morris Sherman (born January 19, 1954)[2] is an American artist whose work consists primarily of photographic self-portraits, depicting herself in many different contexts and as various imagined characters.Her breakthrough work is often considered to be the collection Untitled Film Stills, a series of 70 black-and-white photographs of herself evoking typical female roles in performance media (especially arthouse films and popular B-movies).', birthdate=datetime(1954, 5, 1), nationality='American', image='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTzmRjFgAgkULXZ2-XXhnPg4tiBjm7wTH1SBJrycBZoy76p2SZF')
        artist6 = Artist(name='Jeffrey Lynn Koons ', biography='Jeffrey Lynn Koons ( born January 21, 1955)[1] is an American artist recognized for his work dealing with popular culture and his sculptures depicting everyday objects, including balloon animals produced in stainless steel with mirror-finish surfaces. He lives and works in both New York City and his hometown of York, Pennsylvania. His works have sold for substantial sums, including at least two record auction prices for a work by a living artist: US$58.4 million for Balloon Dog (Orange) in 2013[2] and US$91.1 million for Rabbit in 2019.[3][4].Critics come sharply divided in their views of Koons. Some view his work as pioneering and of major art-historical importance. Others dismiss his work as kitsch, crass, and based on cynical self-merchandising. Koons has stated that there are no hidden meanings or critiques in his works.[5][6]', birthdate=datetime(1955, 8, 15), nationality='American', image='http://t0.gstatic.com/images?q=tbn:ANd9GcSE4xDhtwUWRqrRPc1A9dZC1xsQMSEWOpoVRNGH-mlydOnVOLNb')
        artist7 = Artist(name='Tracey Emin', biography='Dame Tracey Karima Emin DBE RA (born 3 July 1963)[2][3] is an English artist known for autobiographical and confessional artwork. She produces work in a variety of media including drawing, painting, sculpture, film, photography, neon text and sewn appliqué.[4] Once the "enfant terrible" of the Young British Artists in the 1980s, Tracey Emin is now a Royal Academician.[5] In 1997, her work Everyone I Have Ever Slept With 1963–1995, a tent appliquéd with the names of everyone the artist had ever slept with, was shown at Charles Saatchi s Sensation exhibition held at the Royal Academy in London.[6] In the same year, she gained considerable media exposure when she swore repeatedly when drunk on a live British TV discussion programme called The Death of Painting.[7]', birthdate=datetime(1963, 5, 1), nationality='American', image='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ52HPucruIhoKLqKpO1EJGMa4MYOVLcTlk9QN7DlF1MIzjA9nK')
        artist8 = Artist(name='Anish Kapoor', biography='Sir Anish Mikhail Kapoor, CBE, RA (born 12 March 1954) is a British-Indian[2] sculptor specializing in installation art and conceptual art. Born in Mumbai,[3][4] Kapoor attended the elite all-boys Indian boarding school The Doon School, before moving to the UK to begin his art training at Hornsey College of Art and, later, Chelsea School of Art and Design.His notable public sculptures include Cloud Gate (2006, also known as "The Bean") in Chicago s Millennium Park; Sky Mirror, exhibited at the Rockefeller Center in New York City in 2006 and Kensington Gardens in London in 2010;[5] Temenos, at Middlehaven, Middlesbrough; Leviathan,[6] at the Grand Palais in Paris in 2011; and ArcelorMittal Orbit, commissioned as a permanent artwork for London s Olympic Park and completed in 2012.[7] In 2017, Kapoor designed the statuette for the 2018 Brit Awards.[8]', birthdate=datetime(1990, 8, 15), nationality='British- Indian', image='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRldHQVqv7k3gbQ_glXO0oq2ZZvgsm7BUq-NLcUb22FMy91WQ4u')
        artist9 = Artist(name='Shirin Neshat', biography='Shirin Neshat (Persian: شیرین نشاط; born March 26, 1957)[3][4] is an Iranian photographer and visual artist who lives in New York City, known primarily for her work in film, video and photography.[5][6] Her artwork centers on the contrasts between Islam and the West, femininity and masculinity, public life and private life, antiquity and modernity, and bridging the spaces between these subjects.[1][7] Since the Islamic Revolution, she has said that she has "gravitated toward making art that is concerned with tyranny, dictatorship, oppression and political injustice. Although I don’t consider myself an activist, I believe my art – regardless of its nature – is an expression of protest, a cry for humanity.”[8]Neshat has been recognized for winning the International Award of the XLVIII Venice Biennale in 1999,[9] and the Silver Lion as the best director at the 66th Venice Film Festival in 2009,[10] to being named Artist of the Decade by Huffington Post critic G. Roger Denson.[11] Neshat is a critic in the photography department at the Yale School of Art.[12]', birthdate=datetime(1957, 5, 1), nationality='Iranian', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2mmtn7JUtYjwBz3bet6FqC4TqdRLG_qgB-0u1uGwR7tXEjles3LqKOhnq5qSgXcKEmpI&usqp=CAU')
        artist10 = Artist(name='Christopher Ofili', biography='Christopher Ofili, CBE (born 10 October 1968) is a Naigerian painter who is best known for his paintings incorporating elephant dung. He was Turner Prize-winner and one of the Young British Artists. Since 2005, Ofili has been living and working in Trinidad and Tobago, where he currently resides in the city of Port of Spain. He also has lived and worked in London and Brooklyn.[1]Ofili has utilized resin, beads, oil paint, glitter, lumps of elephant dung and cut-outs from pornographic magazines as painting elements. His work has been classified as punk art.', birthdate=datetime(1968, 8, 15), nationality='Naigerian', image='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRBASXIsZrTsKzfRQnFSv5m1g7JfjFejLqOufDfh3jGrIijyPqbFapafdXInB4Qh_Dc')

        db.session.add(artist1)
        db.session.add(artist2)
        db.session.add(artist3)
        db.session.add(artist4)
        db.session.add(artist5)
        db.session.add(artist6)
        db.session.add(artist7)
        db.session.add(artist8)
        db.session.add(artist9)
        db.session.add(artist10)

        db.session.commit()

        # Add Artworks
        artwork1 = Artwork(title='Sunset', medium='Oil on Canvas', style='Impressionism', price=200.00, available=True, artist_id=artist1.id, image='https://www.ocregister.com/wp-content/uploads/2020/01/OCR-L-SUNSETS-0104-01-LO_71377123-1.jpg?w=1024')
        artwork2 = Artwork(title='Enchanted Forest', medium='Acrylic', style='Abstract', price=150.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfrJa6jymFeKoiduswFRUhtGSIDjdEYw6xdw&s')
        artwork3 = Artwork(title='Imagin Mountains', medium='Watercolor', style='Realism', price=180.00, available=True, artist_id=artist1.id, image='https://i.icanvas.com/SFD352?d=3&sh=s&s=s&p=1&bg=w&t=1720818952')
        artwork4 = Artwork(title='Di Picaso', medium='Mixed Media', style='Modern Art', price=220.00, available=True, artist_id=artist1.id, image='https://storage.googleapis.com/pod_public/1300/200892.jpg')
        artwork5 = Artwork(title='Cityscape', medium='Oil on Canvas', style='Expressionism', price=250.00, available=True, artist_id=artist1.id, image='https://render.fineartamerica.com/images/rendered/search/print/8/6/break/images-medium-5/ny-city-brooklyn-bridge-ii-ylli-haruni.jpg')
        artwork6 = Artwork(title='Modain Madame', medium='Charcoal', style='Realism', price=180.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pbWqYmtjM2E4tRyJD2GXVEgX7GKJWjzUSg&s')
        artwork7 = Artwork(title='Monamore', medium='Oil on Canvas', style='Classical', price=200.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBl4ouW6J7DctczQK1ja6GiwIeH_HN_Eolbw&s')
        artwork8 = Artwork(title='G.O.A.T', medium='Acrylic', style='Abstract Expressionism', price=300.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgvLyWih--f_DJXCHADgNt3_8vTKIZ4JWgiA&s')
        artwork9 = Artwork(title='Africanas', medium='Watercolor', style='Impressionism', price=170.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyvozyJCFLtAusOT3mFmT-jMvKZb-9Wf90CA&s')
        artwork10 = Artwork(title='Thee Tree', medium='Mixed Media', style='Surrealism', price=280.00, available=True, artist_id=artist1.id, image='https://media.takealot.com/covers_images/0e56acf396604d34ac7c414b287c7cd7/s-pdpxl.file')
        artwork11 = Artwork(title='imaginationa', medium='Digital Art', style='Pop Art', price=220.00, available=True, artist_id=artist1.id, image='https://pixune.com/wp-content/uploads/2023/11/DALL%C2%B7E-2023-11-30-12.59.03-A-whimsical-and-colorful-illustration-of-an-artist-surrounded-by-a-whirlwind-of-various-art-styles-and-influences.-The-artist-a-middle-aged-Caucasian-1030x589.webp')
        artwork12 = Artwork(title='spooda man', medium='Pastel', style='Realism', price=190.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVaQklJzl-5CoMWwE_uNnQqTN1ENnk7uVuw&s')
        artwork13 = Artwork(title='Modern Sculpture', medium='Metal', style='Modern Art', price=350.00, available=True, artist_id=artist1.id, image='https://www.houseofmaria.co.za/cdn/shop/files/M24002-Connected-1200-x-800_600x.jpg?v=1707745254')
        artwork14 = Artwork(title='Botanical Illustration', medium='Watercolor', style='Botanical Art', price=180.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVrMCktAC5-mxrF-RHSLfJrrNB07oz4DQWqA&s')
        artwork15 = Artwork(title='Futuristic Art', medium='Mixed Media', style='Futurism', price=260.00, available=True, artist_id=artist1.id, image='https://pics.craiyon.com/2023-07-01/4da02f091e5c4fbaa040c8164abd4c29.webp')
        artwork16 = Artwork(title='Abstract Geometry', medium='Acrylic', style='Geometric Abstraction', price=240.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ97Z7BVOlkULaTMHu2pXSc4BZBKhR8_pOsSA&s')
        artwork17 = Artwork(title='Minimalist Art', medium='Oil on Canvas', style='Minimalism', price=200.00, available=True, artist_id=artist1.id, image='https://www.graygroupintl.com/hubfs/Gray%20Group%20International/GGI%20-%20Assign%20and%20Sort%20%28WebP%29/Minimalist%20Art%20The%20Art%20of%20Subtracting.webp')
        artwork18 = Artwork(title='Renaissance Painting', medium='Oil on Canvas', style='Renaissance', price=380.00, available=True, artist_id=artist1.id, image='https://cdn.britannica.com/41/3341-050-825E2B57/The-Creation-of-Adam-ceiling-fresco-Sistine.jpg')
        artwork19 = Artwork(title='Abstract Landscape', medium='Mixed Media', style='Abstract Art', price=270.00, available=True, artist_id=artist1.id, image='https://d1dzh206jt2san.cloudfront.net/posts-content-images/1518762805c1RVS.jpg')
        artwork20 = Artwork(title='Fantasy Art', medium='Digital Art', style='Fantasy', price=230.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyYedM4xXSxhIwajNXDTsbxcg9ahZ6_ifNEw&s')
        artwork21 = Artwork(title='Industrial Art', medium='Metal', style='Industrial Design', price=320.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTNp5SI3azPVOe0B5pElu-JQg4cQqOcDgqKA&s')
        artwork22 = Artwork(title='Cubism', medium='Oil on Canvas', style='Cubism', price=260.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_d8NL29cl9ERgepODP8JMhmxzgw4J0uauQ&s')
        artwork23 = Artwork(title='De Decaprio', medium='Graphite', style='Realism', price=190.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnB4Sg5d0_w0zRYH970i1QbAWgahRWyo6-dQ&s')
        artwork24 = Artwork(title='Abstract Expressionism', medium='Acrylic', style='Abstract Expressionism', price=300.00, available=True, artist_id=artist1.id, image='https://i.pinimg.com/736x/d2/94/fd/d294fdec73c02fb09f7c08c790299941.jpg')
        artwork25 = Artwork(title='Street Art', medium='Spray Paint', style='Graffiti', price=180.00, available=True, artist_id=artist1.id, image='https://www.rawlinspaints.com/blog/wp-content/uploads/2016/01/Street-Art.jpg')
        artwork26 = Artwork(title='Digital Painting', medium='Digital Art', style='Digital Painting', price=220.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuG8SBTJ8mUCUMfafdvGJYU9WX_xW_Qru_Oj5uqretQHEfUMy9yyCwNW-sqkiQGHnuSIg&usqp=CAU')
        artwork27 = Artwork(title='Classical Sculpture', medium='Marble', style='Classical Art', price=380.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJqb0XHZWZB-fMoXWxGzz8KznM-yuJQLos1g&s')
        artwork28 = Artwork(title='Impressionist Landscape', medium='Oil on Canvas', style='Impressionism', price=250.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLiHPvreNwY0ZanNmrR8AbLjUHoGM1pt54A&s')
        artwork29 = Artwork(title='Abstract Figurative Art', medium='Mixed Media', style='Abstract Art', price=270.00, available=True, artist_id=artist1.id, image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Yl5UYdpBYqnxkHcUV2wCHcyjUx8Uc2Jy9A&s')
        artwork30 = Artwork(title='Ancient Art', medium='Stone', style='Ancient Art', price=350.00, available=True, artist_id=artist1.id, image='https://img.freepik.com/free-photo/sun-god-depicted-as-powerful-man-renaissance-setting_23-2151296072.jpg')

        db.session.add(artwork1)
        db.session.add(artwork2)
        db.session.add(artwork3)
        db.session.add(artwork4)
        db.session.add(artwork5)
        db.session.add(artwork6)
        db.session.add(artwork7)
        db.session.add(artwork8)
        db.session.add(artwork9)
        db.session.add(artwork10)
        db.session.add(artwork11)
        db.session.add(artwork12)
        db.session.add(artwork13)
        db.session.add(artwork14)
        db.session.add(artwork15)
        db.session.add(artwork16)
        db.session.add(artwork17)
        db.session.add(artwork18)
        db.session.add(artwork19)
        db.session.add(artwork20)
        db.session.add(artwork21)
        db.session.add(artwork22)
        db.session.add(artwork23)
        db.session.add(artwork24)
        db.session.add(artwork25)
        db.session.add(artwork26)
        db.session.add(artwork27)
        db.session.add(artwork28)
        db.session.add(artwork29)
        db.session.add(artwork30)

        db.session.commit()

        # Add Exhibitions
        exhibition1 = Exhibition(name='Spring Exhibition', start_date=datetime(2024, 3, 1), end_date=datetime(2024, 3, 31), description='A spring art exhibition.', artist_id=artist1.id)
        exhibition2 = Exhibition(name='Autumn Exhibition', start_date=datetime(2024, 9, 1), end_date=datetime(2024, 9, 30), description='An autumn art exhibition.', artist_id=artist2.id)
        exhibition3 = Exhibition(name='Summer Showcase', start_date=datetime(2024, 6, 1), end_date=datetime(2024, 6, 30), description='A summer art showcase.', artist_id=artist1.id)
        exhibition4 = Exhibition(name='Winter Wonderland', start_date=datetime(2024, 12, 1), end_date=datetime(2024, 12, 31), description='A winter art wonderland.', artist_id=artist2.id)
        exhibition5 = Exhibition(name='Abstract Art', start_date=datetime(2024, 4, 1), end_date=datetime(2024, 4, 30), description='An exhibition of abstract art.', artist_id=artist1.id)
        exhibition6 = Exhibition(name='Realism Revival', start_date=datetime(2024, 10, 1), end_date=datetime(2024, 10, 31), description='A revival of realism in art.', artist_id=artist2.id)
        exhibition7 = Exhibition(name='Modern Art Movement', start_date=datetime(2024, 7, 1), end_date=datetime(2024, 7, 31), description='An exhibition showcasing modern art movements.', artist_id=artist1.id)
        exhibition8 = Exhibition(name='Impressionist Masters', start_date=datetime(2024, 11, 1), end_date=datetime(2024, 11, 30), description='An exhibition of impressionist masters.', artist_id=artist2.id)
        exhibition9 = Exhibition(name='Nature Inspired', start_date=datetime(2024, 5, 1), end_date=datetime(2024, 5, 31), description='An exhibition inspired by nature.', artist_id=artist1.id)
        exhibition10 = Exhibition(name='Futuristic Art', start_date=datetime(2024, 8, 1), end_date=datetime(2024, 8, 31), description='An exhibition exploring futuristic themes in art.', artist_id=artist2.id)
        exhibition11 = Exhibition(name='Classical Elegance', start_date=datetime(2024, 2, 1), end_date=datetime(2024, 2, 28), description='An exhibition celebrating classical elegance in art.', artist_id=artist1.id)
        exhibition12 = Exhibition(name='Urban Perspectives', start_date=datetime(2024, 9, 15), end_date=datetime(2024, 10, 15), description='An exhibition exploring urban perspectives.', artist_id=artist2.id)
        exhibition13 = Exhibition(name='Surreal Dreams', start_date=datetime(2024, 7, 15), end_date=datetime(2024, 8, 15), description='An exhibition depicting surrealistic dreams.', artist_id=artist1.id)
        exhibition14 = Exhibition(name='Renaissance Revisited', start_date=datetime(2024, 11, 15), end_date=datetime(2024, 12, 15), description='A revisiting of the renaissance era in art.', artist_id=artist2.id)
        exhibition15 = Exhibition(name='Art of War', start_date=datetime(2024, 6, 15), end_date=datetime(2024, 7, 15), description='An exhibition inspired by the art of war.', artist_id=artist1.id)
        exhibition16 = Exhibition(name='Digital Revolution', start_date=datetime(2024, 8, 15), end_date=datetime(2024, 9, 15), description='An exhibition exploring the digital revolution in art.', artist_id=artist2.id)
        exhibition17 = Exhibition(name='Minimalist Masterpieces', start_date=datetime(2024, 4, 15), end_date=datetime(2024, 5, 15), description='An exhibition showcasing minimalist masterpieces.', artist_id=artist1.id)
        exhibition18 = Exhibition(name='Botanical Beauty', start_date=datetime(2024, 3, 15), end_date=datetime(2024, 4, 15), description='An exhibition celebrating the beauty of botanical art.', artist_id=artist2.id)
        exhibition19 = Exhibition(name='Abstract Expressionism', start_date=datetime(2024, 1, 1), end_date=datetime(2024, 1, 31), description='An exhibition focusing on abstract expressionism.', artist_id=artist1.id)
        exhibition20 = Exhibition(name='Artistic Innovations', start_date=datetime(2024, 10, 15), end_date=datetime(2024, 11, 15), description='An exhibition showcasing artistic innovations.', artist_id=artist2.id)

        db.session.add(exhibition1)
        db.session.add(exhibition2)
        db.session.add(exhibition3)
        db.session.add(exhibition4)
        db.session.add(exhibition5)
        db.session.add(exhibition6)
        db.session.add(exhibition7)
        db.session.add(exhibition8)
        db.session.add(exhibition9)
        db.session.add(exhibition10)
        db.session.add(exhibition11)
        db.session.add(exhibition12)
        db.session.add(exhibition13)
        db.session.add(exhibition14)
        db.session.add(exhibition15)
        db.session.add(exhibition16)
        db.session.add(exhibition17)
        db.session.add(exhibition18)
        db.session.add(exhibition19)
        db.session.add(exhibition20)
        db.session.commit()

        # Add ArtworkExhibitions
        artwork_exhibition1 = ArtworkExhibition(artwork_id=artwork1.id, exhibition_id=exhibition1.id)
        artwork_exhibition2 = ArtworkExhibition(artwork_id=artwork2.id, exhibition_id=exhibition1.id)

        db.session.add(artwork_exhibition1)
        db.session.add(artwork_exhibition2)
        db.session.commit()

        # Add Favorites
        favorite1 = Favorite(user_id=user2.id, artwork_id=artwork1.id)
        favorite2 = Favorite(user_id=user2.id, artwork_id=artwork2.id)

        db.session.add(favorite1)
        db.session.add(favorite2)
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
