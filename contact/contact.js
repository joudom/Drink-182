formOne = `
<form class="container-fluid mb-3 h5" name="form" action="" id="formCS">
    <h1>Reach out to us!</h1>

    <div class="row">
        <label for="name-input">Name</label>
        <br>
        <input type="text" name="name-input" id="name-input" required title="Please Enter Name" pattern="[A-Za-z ]{1,}" placeholder="Name" />
    </div>

    <div class="row">
        <label for="email">Email</label>
        <br>
        <input type="email" name="email" id="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required  placeholder="Email"/>
    </div>

    <div class="row">
        <label for="name-input">Subject</label>
        <br>
        <input type="text" name="name-input" id="name-input" required title="Please Enter Subject" pattern="[A-Za-z ]{1,}" placeholder="Subject" />
    </div>

    <div class="row">
        <label for="aboutMe">Message</label>
        <br>
        <textarea name="aboutMe" id="aboutMe" cols="25" rows="5" maxlength="250" placeholder="250 characters maximum"></textarea>
    </div>

    <div>
        <h4>Are You A Robot?</h4>
        <p>
            <label for="robot-check">Please Type: Bee Boop I am!</label>
            <input id="robot-check" type="text" pattern="Bee Boop I am!">
        </p>
    </div>
        
    <button class="btn btn-outline-success">Submit</button>
</form>`;


formTwo = `
<form class="container-fluid mb-3 h5" name="form" action="" id="formB">
                    <h1>Reach out to us!</h1>
                
                    <div class="row">
                        <label for="name-input">Business Name</label>
                        <br>
                        <input type="text" name="name-input" id="name-input" required title="Please Enter Name" pattern="[A-Za-z]{1,}" placeholder="Name" />
                    </div>

                    <div class="row">
                        <label for="email">Email</label>
                        <br>
                        <input type="email" name="email" id="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required  placeholder="Email"/>
                    </div>
                    
                    <div class="dropdown row">
                        <label for="dropDown">Reason</label>
                        <select>
                            <option>Select Reason...</option>
                            <option>Media</option>
                            <option>Partnerships</option>
                            <option>Sponsorships</option>
                        </select>
                    </div>

                    <div class="row">
                        <label for="aboutMe">Proposal</label>
                        <br>
                        <textarea name="aboutMe" id="aboutMe" cols="25" rows="5" maxlength="250" placeholder="250 characters maximum"></textarea>
                    </div>
            
                    <div>
                        <h4>Are You A Robot?</h4>
                        <p>
                            <label for="robot-check">Please Type: Bee Boop I am!</label>
                            <input id="robot-check" type="text" pattern="Bee Boop I am!">
                        </p>
                    </div>
                        
                    <button class="btn btn-outline-primary btn-light">Submit</button>
                </form>`;

formThree = `
                <form class="container-fluid mb-3 form-inline h5" name="form" id="formSuggest" action="">
                    <h1>Suggestions</h1>
                
                    <div class="row offset-3 col-6">
                        <label for="name-input">Drink Name</label>
                        <input type="text" name="name-input" id="name-input" required title="Please Enter Name" pattern="[A-Za-z ]{1,}" placeholder="Drink Name" />
                    </div>
                    
                    <div class="row">
                        <label for="aboutMe">Ingredients</label>
                        <br>
                        <textarea name="aboutMe" id="aboutMe" cols="25" rows="5" maxlength="250" placeholder="Separate ingredients with commas..."></textarea>
                    </div>
                        
                    <div class="row">
                        <label for="aboutMe">Directions</label>
                        <br>
                        <textarea name="aboutMe" id="aboutMe" cols="25" rows="5" maxlength="250" placeholder="250 characters maximum"></textarea>
                    </div>
                    
                    <div class="my-3 justify-content-center">
                        <div class="form-check form-check-inline col">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                            <label class="form-check-label" for="inlineRadio1">Beginner</label>
                        </div>
                        <div class="form-check form-check-inline col">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                            <label class="form-check-label" for="inlineRadio2">Intermediate</label>
                        </div>
                        <div class="form-check form-check-inline col">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
                            <label class="form-check-label" for="inlineRadio3">Expert</label>
                        </div>
                    </div>
                    <button class="btn btn-outline-dark btn-light">Suggest</button>
                </form>`

$('#support').click(function(e){
    changeForm(formOne);
    $('#support').addClass('active');
    $('#formCS').on('submit',(function(e){
        e.preventDefault();
        thanks();
    }))   
});
$('#business').click(function(e){
    changeForm(formTwo);
    $('#business').addClass('active');
    $('#formB').on('submit',(function(e){
        e.preventDefault();
        thanks();
    }))
});
$('#suggestions').click(function(e){
    changeForm(formThree);
    $('#suggestions').addClass('active');
    $('#formSuggest').on('submit',(function(e){
        e.preventDefault();
        thanks();
    }))
});


function changeForm (form){
    $('#formArea').empty();
    $('#formArea').html(form);
    $('#business').removeClass('active');
    $('#support').removeClass('active');
    $('#suggestions').removeClass('active');  
}

function thanks(){
    let thankyou = `
    <h2 style="font-family:lucida console;">Thank You For Your Submission</h2>
        <p>Our team will review this request and get back you within the next 24-48 business hours.</p>`
    $('#formArea').empty();
    $('#formArea').html(thankyou);
    $('#business').removeClass('active');
    $('#support').removeClass('active');
    $('#suggestions').removeClass('active');
}

$('#formCS').on('submit',(function(e){
    e.preventDefault();
    thanks();
}))
