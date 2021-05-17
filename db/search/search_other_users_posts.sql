SELECT 
p.id AS post_id,
title, 
content, 
img, 
profile_pic, 
date_created,
p.username AS author_username

FROM helo_posts p
JOIN helo_users u ON u.id = p.author_id
WHERE lower(title) LIKE $1 AND u.username != $2
ORDER BY date_created DESC;