from datetime import datetime
from app import User, Artist, Artwork, Exhibition, ArtworkExhibition, Favorite, bcrypt, app
from config import db

def seed():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create dummy users
        user1 = User(
            email='user1@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='art enthusiast'
        )
        user2 = User(
            email='user2@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='art enthusiast'
        )
        user3 = User(
            email='user3@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='art enthusiast'
        )
        user4 = User(
            email='user4@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='art enthusiast'
        )
        user5 = User(
            email='user5@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='art enthusiast'
        )
        user6 = User(
            email='artist1@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='artist'
        )
        user7 = User(
            email='artist2@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='artist'
        )
        user8 = User(
            email='artist3@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='artist'
        )
        user9 = User(
            email='user5@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='artist'
        )
        user10 = User(
            email='artist1@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='artist'
        )
        user11 = User(
            email='artist2@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='artist'
        )
        user12 = User(
            email='artist3@example.com',
            password=bcrypt.generate_password_hash('password123').decode('utf-8'),
            role='artist'
        )
        db.session.add_all([user1, user2, user3, user4, user5, user6, user7, user8])
        db.session.commit()

        # Create dummy artists
        artist1 = Artist(
            name='Pablo Picasso',
            biography='Spanish painter, sculptor, printmaker, ceramicist, and stage designer.',
            birthdate=datetime(1881, 10, 25).date(),
            nationality='Spanish',
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrUOUUGuPxqyzE-6FGwoH1gR5ecYEsWST0g&s',
            user_id=user6.id
        )
        artist2 = Artist(
            name='Claude Monet',
            biography='French painter, a founder of French Impressionist painting.',
            birthdate=datetime(1840, 11, 14).date(),
            nationality='French',
            image='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/220px-Claude_Monet_1899_Nadar_crop.jpg',
            user_id=user7.id
        )
        artist3 = Artist(
            name='Vincent van Gogh',
            biography='Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art.',
            birthdate=datetime(1853, 3, 30).date(),
            nationality='Dutch',
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Xvpw_cHd9YG5vAl2avsTmWXc2IvqJEavNg&s',
            user_id=user8.id
        )
        artist4 = Artist(
            name='Cynthia Morris Sherman',
            biography='Cynthia Morris Sherman (born January 19, 1954)[2] is an American artist whose work consists primarily of photographic self-portraits, depicting herself in many different contexts and as various imagined characters.Her breakthrough work is often considered to be the collection Untitled Film Stills, a series of 70 black-and-white photographs of herself evoking typical female roles in performance media (especially arthouse films and popular B-movies).',
            birthdate=datetime(1954, 5, 1).date(),
            nationality='American',
            image='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTzmRjFgAgkULXZ2-XXhnPg4tiBjm7wTH1SBJrycBZoy76p2SZF',
            user_id=user8.id
        )
        artist5 = Artist(
            name='Jeffrey Lynn Koons',
            biography='Jeffrey Lynn Koons ( born January 21, 1955)[1] is an American artist recognized for his work dealing with popular culture and his sculptures depicting everyday objects, including balloon animals produced in stainless steel with mirror-finish surfaces. He lives and works in both New York City and his hometown of York, Pennsylvania. His works have sold for substantial sums, including at least two record auction prices for a work by a living artist: US$58.4 million for Balloon Dog (Orange) in 2013[2] and US$91.1 million for Rabbit in 2019.[3][4].Critics come sharply divided in their views of Koons. Some view his work as pioneering and of major art-historical importance. Others dismiss his work as kitsch, crass, and based on cynical self-merchandising. Koons has stated that there are no hidden meanings or critiques in his works.[5][6]',
            birthdate=datetime(1955, 8, 15).date(),
            nationality='American',
            image='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ52HPucruIhoKLqKpO1EJGMa4MYOVLcTlk9QN7DlF1MIzjA9nK',
            user_id=user6.id
        )
        artist6 = Artist(
            name='Tracey Emin',
            biography='Dame Tracey Karima Emin DBE RA (born 3 July 1963)[2][3] is an English artist known for autobiographical and confessional artwork. She produces work in a variety of media including drawing, painting, sculpture, film, photography, neon text and sewn appliqué.[4] Once the "enfant terrible" of the Young British Artists in the 1980s, Tracey Emin is now a Royal Academician.[5] In 1997, her work Everyone I Have Ever Slept With 1963–1995, a tent appliquéd with the names of everyone the artist had ever slept with, was shown at Charles Saatchi s Sensation exhibition held at the Royal Academy in London.[6] In the same year, she gained considerable media exposure when she swore repeatedly when drunk on a live British TV discussion programme called The Death of Painting.[7]',
            birthdate=datetime(1840, 11, 14).date(),
            nationality='French',
            image='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ52HPucruIhoKLqKpO1EJGMa4MYOVLcTlk9QN7DlF1MIzjA9nK',
            user_id=user7.id
        )
        artist7 = Artist(
            name='Anish Kapoor',
            biography='Sir Anish Mikhail Kapoor, CBE, RA (born 12 March 1954) is a British-Indian[2] sculptor specializing in installation art and conceptual art. Born in Mumbai,[3][4] Kapoor attended the elite all-boys Indian boarding school The Doon School, before moving to the UK to begin his art training at Hornsey College of Art and, later, Chelsea School of Art and Design.His notable public sculptures include Cloud Gate (2006, also known as "The Bean") in Chicago s Millennium Park; Sky Mirror, exhibited at the Rockefeller Center in New York City in 2006 and Kensington Gardens in London in 2010;[5] Temenos, at Middlehaven, Middlesbrough; Leviathan,[6] at the Grand Palais in Paris in 2011; and ArcelorMittal Orbit, commissioned as a permanent artwork for London s Olympic Park and completed in 2012.[7] In 2017, Kapoor designed the statuette for the 2018 Brit Awards.[8]',
            birthdate=datetime(1990, 8, 15).date(),
            nationality='British- Indian',
            image='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRldHQVqv7k3gbQ_glXO0oq2ZZvgsm7BUq-NLcUb22FMy91WQ4u',
            user_id=user8.id
        )
        artist8 = Artist(
            name='Shirin Neshat',
            biography='Shirin Neshat (Persian: شیرین نشاط; born March 26, 1957)[3][4] is an Iranian photographer and visual artist who lives in New York City, known primarily for her work in film, video and photography.[5][6] Her artwork centers on the contrasts between Islam and the West, femininity and masculinity, public life and private life, antiquity and modernity, and bridging the spaces between these subjects.[1][7] Since the Islamic Revolution, she has said that she has "gravitated toward making art that is concerned with tyranny, dictatorship, oppression and political injustice. Although I don’t consider myself an activist, I believe my art – regardless of its nature – is an expression of protest, a cry for humanity.”[8]Neshat has been recognized for winning the International Award of the XLVIII Venice Biennale in 1999,[9] and the Silver Lion as the best director at the 66th Venice Film Festival in 2009,[10] to being named Artist of the Decade by Huffington Post critic G. Roger Denson.[11] Neshat is a critic in the photography department at the Yale School of Art.[12].',
            birthdate=datetime(1957, 5, 1).date(),
            nationality='Iranian',
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2mmtn7JUtYjwBz3bet6FqC4TqdRLG_qgB-0u1uGwR7tXEjles3LqKOhnq5qSgXcKEmpI&usqp=CAU',
            user_id=user8.id
        )
        artist9 = Artist(
            name='Christopher Ofili',
            biography='Christopher Ofili, CBE (born 10 October 1968) is a Naigerian painter who is best known for his paintings incorporating elephant dung. He was Turner Prize-winner and one of the Young British Artists. Since 2005, Ofili has been living and working in Trinidad and Tobago, where he currently resides in the city of Port of Spain. He also has lived and worked in London and Brooklyn.[1]Ofili has utilized resin, beads, oil paint, glitter, lumps of elephant dung and cut-outs from pornographic magazines as painting elements. His work has been classified as punk art.',
            birthdate=datetime(1968, 8, 15).date(),
            nationality='Naigerian',
            image='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRBASXIsZrTsKzfRQnFSv5m1g7JfjFejLqOufDfh3jGrIijyPqbFapafdXInB4Qh_Dc',
            user_id=user6.id
        )
        artist10 = Artist(
            name='Claude Monet',
            biography='French painter, a founder of French Impressionist painting.',
            birthdate=datetime(1840, 11, 14).date(),
            nationality='French',
            image='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/220px-Claude_Monet_1899_Nadar_crop.jpg',
            user_id=user7.id
        )
        artist11 = Artist(
            name='Jennifer Anne Saville',
            biography='Jennifer Anne Saville RA (born 7 May 1970)[1] is a contemporary British painter and an original member of the Young British Artists.[2] Saville works and lives in Oxford, England[3] and she is known for her large-scale painted depictions of nude women. Saville has been credited with originating a new and challenging method of painting the female nude and reinventing figure painting for contemporary art. Some paintings are of small dimensions, while other are of much larger scale.[4] Monumental subjects come from pathology textbooks that she has studied that informed her on injury to bruise, burns, and deformity.[5] John Gray commented: "As I see it, Jenny Saville s work expresses a parallel project of reclaiming the body from personality. Saville worked with many models who underwent cosmetic surgery to reshape a portion of their body. In doing that, she captures marks of personality for the flesh and together embraces how we can be the writers of our own lives',
            birthdate=datetime(1985, 5, 1).date(),
            nationality='American',
            image='data:image/jpeg;base64,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.',
            user_id=user8.id
        )
        artist12 = Artist(
            name='Damien Hirst',
            biography='Damien Steven Hirst ( born 7 June 1965) is an English artist and art collector.[1] He is one of the Young British Artists (YBAs) who dominated the art scene in the UK during the 1990s.[2][3] He is reportedly the United Kingdom s richest living artist, with his wealth estimated at US$384 million in the 2020 Sunday Times Rich List.[4][5][6] During the 1990s his career was closely linked with the collector Charles Saatchi, but increasing frictions came to a head in 2003 and the relationship ended.',
            birthdate=datetime(1965, 8, 15).date(),
            nationality='British',
            image='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqCGhYhGAUgeK8pOavujT9YLr25Kl1a7aAJqDYpLI1oyk2CRt9',
            user_id=user8.id
        )

        db.session.add_all([artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8, artist9, artist10, artist11, artist12])
        db.session.commit()

        # Create dummy artworks
        artwork1 = Artwork(
            title='Sunset',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist1.id,
            image='https://www.ocregister.com/wp-content/uploads/2020/01/OCR-L-SUNSETS-0104-01-LO_71377123-1.jpg?w=1024'
        )
        artwork2 = Artwork(
            title='Enchanted Forest',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist2.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfrJa6jymFeKoiduswFRUhtGSIDjdEYw6xdw&s'
        )
        artwork3 = Artwork(
            title='Imagin Mountains',
            medium='Renoir painted this portrait of his friend Paul Durand-Ruel’s second son, Jean, in London in 1882.',
            style='Impressionism',  # Added style
            price=100000.0,  # Added price
            available=True,
            artist_id=artist3.id,
            image='https://i.icanvas.com/SFD352?d=3&sh=s&s=s&p=1&bg=w&t=1720818952'
        )
        artwork4 = Artwork(
            title='Di Picaso',
            medium='Some of Saville’s pieces are solely created with paint, whereas others incorporate materials such as charcoal and pastels as well.',
            style='Contemporary',  # Added style
            price=120000.0,  # Added price
            available=True,
            artist_id=artist1.id,
            image='https://storage.googleapis.com/pod_public/1300/200892.jpg'
        )
        artwork5 = Artwork(
            title='Cityscape',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist1.id,
            image='https://render.fineartamerica.com/images/rendered/search/print/8/6/break/images-medium-5/ny-city-brooklyn-bridge-ii-ylli-haruni.jpg'
        )
        artwork6 = Artwork(
            title='Modain Madame',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist4.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pbWqYmtjM2E4tRyJD2GXVEgX7GKJWjzUSg&s'
        )
        artwork7 = Artwork(
            title='Monamore',
            medium='Renoir painted this portrait of his friend Paul Durand-Ruel’s second son, Jean, in London in 1882.',
            style='Impressionism',  # Added style
            price=100000.0,  # Added price
            available=True,
            artist_id=artist5.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBl4ouW6J7DctczQK1ja6GiwIeH_HN_Eolbw&s'
        )
        artwork8 = Artwork(
            title='G.O.A.T',
            medium='Some of Saville’s pieces are solely created with paint, whereas others incorporate materials such as charcoal and pastels as well.',
            style='Contemporary',  # Added style
            price=120000.0,  # Added price
            available=True,
            artist_id=artist6.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgvLyWih--f_DJXCHADgNt3_8vTKIZ4JWgiA&s'
        )
        artwork9 = Artwork(
            title='Africanas',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist1.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyvozyJCFLtAusOT3mFmT-jMvKZb-9Wf90CA&s'
        )
        artwork10 = Artwork(
            title='Thee Tree',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist7.id,
            image='https://media.takealot.com/covers_images/0e56acf396604d34ac7c414b287c7cd7/s-pdpxl.file'
        )
        artwork11 = Artwork(
            title='Renaissance Painting',
            medium='Renoir painted this portrait of his friend Paul Durand-Ruel’s second son, Jean, in London in 1882.',
            style='Impressionism',  # Added style
            price=100000.0,  # Added price
            available=True,
            artist_id=artist8.id,
            image='https://cdn.britannica.com/41/3341-050-825E2B57/The-Creation-of-Adam-ceiling-fresco-Sistine.jpg'
        )
        artwork12 = Artwork(
            title='Imaginationa',
            medium='Some of Saville’s pieces are solely created with paint, whereas others incorporate materials such as charcoal and pastels as well.',
            style='Contemporary',  # Added style
            price=120000.0,  # Added price
            available=True,
            artist_id=artist9.id,
            image='https://pixune.com/wp-content/uploads/2023/11/DALL%C2%B7E-2023-11-30-12.59.03-A-whimsical-and-colorful-illustration-of-an-artist-surrounded-by-a-whirlwind-of-various-art-styles-and-influences.-The-artist-a-middle-aged-Caucasian-1030x589.webp'
        )
        artwork13 = Artwork(
            title='Abstract Landscape',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist10.id,
            image='https://d1dzh206jt2san.cloudfront.net/posts-content-images/1518762805c1RVS.jpg'
        )
        artwork14 = Artwork(
            title='Spooda man',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist12.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVaQklJzl-5CoMWwE_uNnQqTN1ENnk7uVuw&s'
        )
        artwork15 = Artwork(
            title='Cubism',
            medium='Renoir painted this portrait of his friend Paul Durand-Ruel’s second son, Jean, in London in 1882.',
            style='Impressionism',  # Added style
            price=100000.0,  # Added price
            available=True,
            artist_id=artist11.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_d8NL29cl9ERgepODP8JMhmxzgw4J0uauQ&s'
        )
        artwork16 = Artwork(
            title='Modern Sculpture',
            medium='Some of Saville’s pieces are solely created with paint, whereas others incorporate materials such as charcoal and pastels as well.',
            style='Contemporary',  # Added style
            price=120000.0,  # Added price
            available=True,
            artist_id=artist12.id,
            image='https://www.houseofmaria.co.za/cdn/shop/files/M24002-Connected-1200-x-800_600x.jpg?v=1707745254'
        )
        artwork17= Artwork(
            title='Botanical Illustration',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist4.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVrMCktAC5-mxrF-RHSLfJrrNB07oz4DQWqA&s'
        )
        artwork18 = Artwork(
            title='Futuristic Art',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist5.id,
            image='https://pics.craiyon.com/2023-07-01/4da02f091e5c4fbaa040c8164abd4c29.webp'
        )
        artwork19= Artwork(
            title='Abstract Geometry',
            medium='Renoir painted this portrait of his friend Paul Durand-Ruel’s second son, Jean, in London in 1882.',
            style='Impressionism',  # Added style
            price=100000.0,  # Added price
            available=True,
            artist_id=artist6.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ97Z7BVOlkULaTMHu2pXSc4BZBKhR8_pOsSA&s'
        )
        artwork20= Artwork(
            title='Minimalist Art',
            medium='Some of Saville’s pieces are solely created with paint, whereas others incorporate materials such as charcoal and pastels as well.',
            style='Contemporary',  # Added style
            price=120000.0,  # Added price
            available=True,
            artist_id=artist7.id,
            image='https://www.graygroupintl.com/hubfs/Gray%20Group%20International/GGI%20-%20Assign%20and%20Sort%20%28WebP%29/Minimalist%20Art%20The%20Art%20of%20Subtracting.webp'
        )
        artwork21 = Artwork(
            title='De Decaprio',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist9.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnB4Sg5d0_w0zRYH970i1QbAWgahRWyo6-dQ&s'
        )
        artwork22 = Artwork(
            title='Abstract Expressionism',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist10.id,
            image='https://i.pinimg.com/736x/d2/94/fd/d294fdec73c02fb09f7c08c790299941.jpg'
        )
        artwork23 = Artwork(
            title='Street Art',
            medium='Renoir painted this portrait of his friend Paul Durand-Ruel’s second son, Jean, in London in 1882.',
            style='Impressionism',  # Added style
            price=100000.0,  # Added price
            available=True,
            artist_id=artist11.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLgDrRxO9kL3OZW9qlPl8JGBG4IRTiJtFP6A&usqp=CAU'
        )
        artwork24 = Artwork(
            title='Jenny Saville',
            medium='Some of Saville’s pieces are solely created with paint, whereas others incorporate materials such as charcoal and pastels as well.',
            style='Contemporary',  # Added style
            price=120000.0,  # Added price
            available=True,
            artist_id=artist12.id,
            image='https://www.rawlinspaints.com/blog/wp-content/uploads/2016/01/Street-Art.jpg'
        )
        artwork25 = Artwork(
            title='Digital Painting',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist10.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuG8SBTJ8mUCUMfafdvGJYU9WX_xW_Qru_Oj5uqretQHEfUMy9yyCwNW-sqkiQGHnuSIg&usqp=CAU'
        )
        artwork26 = Artwork(
            title='Classical Sculpture',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist3.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJqb0XHZWZB-fMoXWxGzz8KznM-yuJQLos1g&s'
        )
        artwork27 = Artwork(
            title='Impressionist Landscape',
            medium='Renoir painted this portrait of his friend Paul Durand-Ruel’s second son, Jean, in London in 1882.',
            style='Impressionism',  # Added style
            price=100000.0,  # Added price
            available=True,
            artist_id=artist2.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLiHPvreNwY0ZanNmrR8AbLjUHoGM1pt54A&s'
        )
        artwork28 = Artwork(
            title='Abstract Figurative Art',
            medium='Some of Saville’s pieces are solely created with paint, whereas others incorporate materials such as charcoal and pastels as well.',
            style='Contemporary',  # Added style
            price=120000.0,  # Added price
            available=True,
            artist_id=artist5.id,
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Yl5UYdpBYqnxkHcUV2wCHcyjUx8Uc2Jy9A&s'
        )
        artwork29 = Artwork(
            title='Ancient Art',
            medium='A large oil painting created in 1907 by the Spanish artist Pablo Picasso.',
            style='Cubism',  # Added style
            price=150000.0,  # Added price
            available=True,
            artist_id=artist6.id,
            image='https://img.freepik.com/free-photo/sun-god-depicted-as-powerful-man-renaissance-setting_23-2151296072.jpg'
        )
        artwork30 = Artwork(
            title='Guernica',
            medium='A large 1937 oil painting on canvas by Spanish artist Pablo Picasso.',
            style='Surrealism',  # Added style
            price=200000.0,  # Added price
            available=False,
            artist_id=artist7.id,
            image='https://www.museoreinasofia.es/sites/default/files/obras/DE00050_0.jpg'
        )

        db.session.add_all([artwork1, artwork2, artwork3, artwork4, artwork5, artwork6, artwork7, artwork8, artwork9, artwork10, artwork11, artwork12, artwork13, artwork14, artwork15, artwork16, artwork17, artwork18, artwork19, artwork20, artwork21, artwork22, artwork23, artwork24, artwork25, artwork26, artwork27, artwork28, artwork29, artwork30 ])
        db.session.commit()

        # Create dummy exhibitions
        exhibition1 = Exhibition(
            name='Modern Art Exhibition',
            start_date=datetime(2022, 6, 1).date(),
            end_date=datetime(2022, 9, 1).date(),
            description='An exhibition showcasing modern art.',
            artist_id=artist1.id
        )
        exhibition2 = Exhibition(
            name='Classic Art Exhibition',
            start_date=datetime(2022, 10, 1).date(),
            end_date=datetime(2022, 12, 1).date(),
            description='An exhibition showcasing classic art.',
            artist_id=artist2.id
        )
        db.session.add_all([exhibition1, exhibition2])
        db.session.commit()

        # Associate artworks with exhibitions
        ae1 = ArtworkExhibition(
            artwork_id=artwork1.id,
            exhibition_id=exhibition1.id
        )
        ae2 = ArtworkExhibition(
            artwork_id=artwork2.id,
            exhibition_id=exhibition1.id
        )
        ae3 = ArtworkExhibition(
            artwork_id=artwork3.id,
            exhibition_id=exhibition2.id
        )
        db.session.add_all([ae1, ae2, ae3])
        db.session.commit()

        # Create dummy favorites
        favorite1 = Favorite(
            user_id=user1.id,
            artwork_id=artwork1.id
        )
        favorite2 = Favorite(
            user_id=user3.id,
            artwork_id=artwork2.id
        )
        favorite3 = Favorite(
            user_id=user5.id,
            artwork_id=artwork3.id
        )
        db.session.add_all([favorite1, favorite2, favorite3])
        db.session.commit()

        print("Database seeded!")
if __name__ == '__main__':
    seed()