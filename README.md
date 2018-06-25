# mkpwdlist - Make Password List
No dependency NodeJS password list generator based on tokens, using multiple permutations. 

## Usage
`node mkpwdlist <token_list> <permutations> <output_file>`

## `<token_list>`            
File containing a list of words that should be used as tokens for generating the final list.

## `<permutations>`          
Flags representation the desired transformations. Those have to appear after a single "-". See bottom example.

- `a` : Use default optimal settings. Cannot be used with other flags.
- `m` : Mix words from input list into long strings
- `n` : Prepend numbers to all input
- `N` : Append numbers to all input
- `c` : Mix in special characters
- `H` : Output random hexadecimal 8 character passwords

## `<output_file>`           
A file which will be created containing the final list of passwords.

## Configuration file
The settings.json file contains various configrations related to the permutations.
Those are human-readable and should be easy to understand.

- `maxWordMix` : Using the -m flag, maximum number of word mixes.
- `numberGenStart` : Using the -n or -N flag, lowest possible number to append / prepend.
- `numberGenEnd` : Using the -n or -N flag, highest possible number to append / prepend.
- `characters` : Using the -c flag, list of special characters to use.
- `flushInterval` : Number of ms between each buffer flush. If you run into an out of RAM crash, lower this number to 20, or even 5. Higher means faster but more RAM usage, lower means slower but less RAM usage.


## Example 
`node mkpwdlist listOfWords.txt -Nnc list.txt`

The previous example will create a list based on listOfWords.txt with numbers at beginning and end,
and special characters.

The flags will be executed in the provided order. That means in the previous example, the final list
will contain passwords with numbers at the end, at the beginning and end, then with numbers and
special characters.

## TODO
- Insert special characters between tokens
- Insert numbers between tokens instead of just append / prepend
- Upper / Lower flag
- L3375P34K generator (p@ssw0rd and stuff)
- Stream mode (no file lock)
- Split lists into multiple files 
- Use `cluster` to generate lists using multiple CPUs (multi-thread)
- Wildcards support in token list
- 8-char hex output for router pentesting
- Interactive mode
- Other output formats (CSL, JSON, CSV, XML) 
- Second output file with hashed passwords (SHA1, SHA256, MD5, etc)

## License 
This does not come with a license yet. It will likely be under **MIT**, but it really depends how the tool is being used.

mkpwdlist's purpose is to test password strenghts. It can be used for your business to go through your db and find weak passwords to trigger password changes using the upcoming feature to hash the final list. It can also be used with existing password lists to play around with them. It can also make you realize how terrible your passwords are.

It's a fun project, nothing more :) 
