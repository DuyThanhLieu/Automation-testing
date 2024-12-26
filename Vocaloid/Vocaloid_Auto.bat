@REM call npx playwright test AccountUser.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test ConvertVoice.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test CreateLyrics.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test CreateMusic.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test CreateMelody.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test AIMastering.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test MusicSplitter.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test RemoveVocal.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test AvatarMV.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test CreateMVMusic.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test History.spec.js --headed --reporter=line --workers=1

@REM call npx playwright test ConvertVoice.spec.js CreateLyrics.spec.js CreateMusic.spec.js CreateMelody.spec.js AIMastering.spec.js MusicSplitter.spec.js RemoveVocal.spec.js AvatarMV.spec.js CreateMVMusic.spec.js History.spec.js --headed --reporter=html --output=./Results --workers=1

call npx playwright test ConvertVoice.spec.js CreateLyrics.spec.js CreateMusic.spec.js CreateMelody.spec.js AIMastering.spec.js MusicSplitter.spec.js RemoveVocal.spec.js AvatarMV.spec.js CreateMVMusic.spec.js History.spec.js --reporter=html --output=./Results --workers=1
