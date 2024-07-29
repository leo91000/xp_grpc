fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Compile all .proto files in proto/ directory

    // list proto files
    let proto_file_iter = std::fs::read_dir("proto")?
        .map(|res| res.map(|e| e.path()))
        .filter_map(Result::ok)
        .filter(|path| path.extension().map_or(false, |ext| ext == "proto"));

    for proto_file in proto_file_iter {
        println!("Compiling proto {:?}", proto_file);
        tonic_build::compile_protos(proto_file)?;
    }

    Ok(())
}
