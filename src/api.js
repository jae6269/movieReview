export async function getReviews({
  order = 'createdAt',
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/3416/film-reviews?${query}`
  );
  const body = await response.json();
  return body;
}

export async function createReview(forData) {
  const response = await fetch(`https://learn.codeit.kr/3416/film-reviews`, {
    method: 'POST',
    body: forData,
  });
  if (!response.ok) {
    throw new Error('리뷰 생성 실패 에러');
  }
  const body = await response.json();
  return body;
}
