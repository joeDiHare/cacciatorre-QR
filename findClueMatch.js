function findClueMatch(ind_code, team_psw){
  for(i = 0; i < all_matches.length; i++) {
    if (all_matches[i][0] == team_psw && all_matches[i][1] == ind_code){
      console.log('match found at: ' + all_matches[i])
      return all_matches[i];
    }
  }
  console.log('match not found in findClueMatch()')
  return NaN
}
